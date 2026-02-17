'use client'

import RealtimeTable from '@/components/admin/RealtimeTable'
import { createColumnHelper, ColumnDef } from '@tanstack/react-table'
import { TeamRecord } from '@/types'
import { format } from 'date-fns'

const columnHelper = createColumnHelper<TeamRecord>()

const columns = [
	columnHelper.accessor('id', {
		header: 'ID',
		cell: (info) => info.getValue().slice(0, 8) + '...',
	}),
	columnHelper.accessor('name', {
		header: 'Team Name',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('current_step', {
		header: 'Status',
		cell: (info) => (
			<span
				className={`px-2 py-1 rounded text-xs font-bold tracking-widest ${
					info.getValue() === 'COMPLETED'
						? 'bg-green-500/10 text-green-500 border border-green-500/20'
						: 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
				}`}
			>
				{info.getValue()}
			</span>
		),
	}),
	columnHelper.accessor('p1_name', {
		header: 'P1 Name',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('p1_character', {
		header: 'P1 Char',
		cell: (info) => info.getValue() || '-',
	}),
	columnHelper.accessor('p1_level', {
		header: 'P1 Lvl',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('p2_name', {
		header: 'P2 Name',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('p2_character', {
		header: 'P2 Char',
		cell: (info) => info.getValue() || '-',
	}),
	columnHelper.accessor('p2_level', {
		header: 'P2 Lvl',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('p3_name', {
		header: 'P3 Name',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('p3_character', {
		header: 'P3 Char',
		cell: (info) => info.getValue() || '-',
	}),
	columnHelper.accessor('p3_level', {
		header: 'P3 Lvl',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('created_at', {
		header: 'Created At',
		cell: (info) => {
			try {
				return format(new Date(info.getValue()), 'MMM d, HH:mm')
			} catch {
				return info.getValue()
			}
		},
	}),
]

export default function TeamsAdminPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-stone-100 tracking-tight">
					Team Management
				</h1>
				<p className="text-stone-500 mt-1">
					View and edit all registered teams in real-time.
				</p>
			</div>

			<RealtimeTable<TeamRecord>
				tableName="teams"
				columns={columns as ColumnDef<TeamRecord, unknown>[]}
			/>
		</div>
	)
}
