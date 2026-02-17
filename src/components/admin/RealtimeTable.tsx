'use client'

import { useState, useEffect, useCallback } from 'react'
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	ColumnDef,
} from '@tanstack/react-table'
import { createClient } from '@/lib/supabase/client'
import { RefreshCw, Trash2, Save, X, Edit2 } from 'lucide-react'

interface RealtimeTableProps<T extends { id: string | number }> {
	tableName: string
	columns: ColumnDef<T, unknown>[]
	initialData?: T[]
	onUpdate?: (id: string | number, data: Partial<T>) => Promise<void>
	onDelete?: (id: string | number) => Promise<void>
	onInsert?: (data: Partial<T>) => Promise<void>
}

export default function RealtimeTable<T extends { id: string | number }>({
	tableName,
	columns,
	initialData = [],
}: RealtimeTableProps<T>) {
	const [data, setData] = useState<T[]>(initialData)
	const [loading, setLoading] = useState(true)
	const [editingRowId, setEditingRowId] = useState<string | number | null>(null)
	const [editFormData, setEditFormData] = useState<Partial<T>>({})
	const [isSaving, setIsSaving] = useState(false)

	const supabase = createClient()

	const fetchData = useCallback(async () => {
		setLoading(true)
		try {
			const { data, error } = await supabase
				.from(tableName)
				.select('*')
				.order('created_at', { ascending: false })

			if (error) throw error
			setData(data as T[])
		} catch (err: unknown) {
			console.error(`Error fetching data from ${tableName}:`, err)
		} finally {
			setLoading(false)
		}
	}, [tableName, supabase])

	useEffect(() => {
		fetchData()

		const channel = supabase
			.channel(`public:${tableName}`)
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: tableName },
				(payload) => {
					console.log('Realtime update:', payload)
					if (payload.eventType === 'INSERT') {
						setData((prev) => [payload.new as T, ...prev])
					} else if (payload.eventType === 'UPDATE') {
						setData((prev) =>
							prev.map((item) =>
								item.id === payload.new.id ? (payload.new as T) : item,
							),
						)
					} else if (payload.eventType === 'DELETE') {
						setData((prev) => prev.filter((item) => item.id !== payload.old.id))
					}
				},
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [tableName, supabase, fetchData])

	const handleEdit = (row: T) => {
		setEditingRowId(row.id)
		setEditFormData(row)
	}

	const handleCancelEdit = () => {
		setEditingRowId(null)
		setEditFormData({})
	}

	const handleSave = async (id: string | number) => {
		setIsSaving(true)
		try {
			const { error } = await supabase
				.from(tableName)
				.update(editFormData)
				.eq('id', id)

			if (error) throw error

			// Optimistically update the local state to ensure immediate UI reflection
			setData((prev) =>
				prev.map((item) =>
					item.id === id ? ({ ...item, ...editFormData } as T) : item,
				),
			)

			setEditingRowId(null)
			setEditFormData({})
		} catch (err: unknown) {
			console.error(`Error updating row in ${tableName}:`, err)
			const message = err instanceof Error ? err.message : 'Unknown error'
			alert(`Failed to save: ${message}`)
		} finally {
			setIsSaving(false)
		}
	}

	const handleDelete = async (id: string | number) => {
		if (!confirm('Are you sure you want to delete this record?')) return

		try {
			const { error } = await supabase.from(tableName).delete().eq('id', id)
			if (error) throw error
		} catch (err: unknown) {
			console.error(`Error deleting row from ${tableName}:`, err)
			const message = err instanceof Error ? err.message : 'Unknown error'
			alert(`Failed to delete: ${message}`)
		}
	}

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	if (loading && data.length === 0) {
		return (
			<div className="flex items-center justify-center p-20 text-amber-500">
				<RefreshCw className="w-8 h-8 animate-spin" />
			</div>
		)
	}

	return (
		<div className="w-full bg-[#111] rounded-xl border border-stone-800 shadow-2xl overflow-hidden">
			<div className="p-4 border-b border-stone-800 flex justify-between items-center bg-[#151515]">
				<h3 className="text-xl font-bold text-amber-500 uppercase tracking-wider">
					{tableName}
				</h3>
				<div className="flex gap-2">
					<button
						onClick={() => fetchData()}
						className="p-2 rounded-lg hover:bg-stone-800 text-stone-400 transition-colors"
						title="Refresh Data"
					>
						<RefreshCw className="w-5 h-5" />
					</button>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full text-left border-collapse">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="bg-stone-900">
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest border-b border-stone-800"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</th>
								))}
								<th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest border-b border-stone-800">
									Actions
								</th>
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className={`group hover:bg-stone-800/50 transition-colors ${
									editingRowId === row.original.id ? 'bg-amber-500/5' : ''
								}`}
							>
								{row.getVisibleCells().map((cell) => {
									const isEditing = editingRowId === row.original.id
									const columnId = cell.column.id

									return (
										<td
											key={cell.id}
											className="px-6 py-4 border-b border-stone-800/50 text-sm"
										>
											{isEditing && !cell.column.id.includes('at') && cell.column.id !== 'id' ? (
												<input
													className="bg-[#1a1a1a] border border-stone-700 rounded px-3 py-1.5 w-full text-amber-100 outline-none focus:border-amber-500/50"
													value={(editFormData as Record<string, string | number>)[columnId] || ''}
													onChange={(e) =>
														setEditFormData({
															...editFormData,
															[columnId]: e.target.value,
														} as Partial<T>)
													}
													onKeyDown={(e) => {
														if (e.key === 'Enter') {
															handleSave(row.original.id)
														} else if (e.key === 'Escape') {
															handleCancelEdit()
														}
													}}
												/>
											) : (
												<span
													className={
														cell.column.id === 'id'
															? 'font-mono text-xs text-stone-500'
															: 'text-stone-300'
													}
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</span>
											)}
										</td>
									)
								})}
								<td className="px-6 py-4 border-b border-stone-800/50 text-sm">
									<div className="flex gap-2">
										{editingRowId === row.original.id ? (
											<>
												<button
													onClick={() => handleSave(row.original.id)}
													disabled={isSaving}
													className="p-1.5 rounded bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-all"
													title="Save Changes"
												>
													<Save className="w-4 h-4" />
												</button>
												<button
													onClick={handleCancelEdit}
													className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
													title="Cancel"
												>
													<X className="w-4 h-4" />
												</button>
											</>
										) : (
											<>
												<button
													onClick={() => handleEdit(row.original)}
													className="p-1.5 rounded hover:bg-stone-700 text-stone-400 hover:text-amber-500 transition-all"
													title="Edit Row"
												>
													<Edit2 className="w-4 h-4" />
												</button>
												<button
													onClick={() => handleDelete(row.original.id)}
													className="p-1.5 rounded hover:bg-red-500/10 text-stone-400 hover:text-red-500 transition-all"
													title="Delete Row"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{data.length === 0 && !loading && (
				<div className="p-20 text-center text-stone-500">
					No records found in {tableName}
				</div>
			)}
		</div>
	)
}
