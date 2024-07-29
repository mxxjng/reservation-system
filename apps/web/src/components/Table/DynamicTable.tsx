import React, { HTMLProps } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ActionIcon, Box, Divider, Group, NumberInput, Select, Table, Text } from "@mantine/core";
import {
  IconArrowDown,
  IconArrowUp,
  IconArrowsDownUp,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconSearch,
} from "@tabler/icons-react";

import { DebouncedInput } from "./Filter";
import { fuzzyFilter } from "./helper";

type DynamicTableProps<T extends Record<string, any>> = {
  /* Data to render in the table */
  data: T[];

  /* Column definition for the table */
  columns: ColumnDef<T, any>[];

  /* Optional Action button to render right of the search bar */
  actionButton?: React.ReactNode;

  /* Optional props to select rows */
  canSelect?: boolean;

  /* Optional function to handle selected row data */
  handleSelectedRows?: (selectedRows: T[]) => void;

  /* Optional counter to reset the table from parent */
  resetCounter?: number;

  /* Optional component for selection menu */
  selectionMenu?: React.ReactNode;
};

/* Dynamic Table to render content in a table format */
const DynamicTable = <T extends Record<string, any>>({
  data: defaultData,
  columns: defaultColumns,
  actionButton,
  canSelect = false,
  resetCounter = 0,
  selectionMenu,
  handleSelectedRows,
}: DynamicTableProps<T>) => {
  // load data to state from props
  const [data, setData] = React.useState(() => [...defaultData]);

  // state for column filters
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  // state for global filter
  const [globalFilter, setGlobalFilter] = React.useState("");

  // load the column definition
  const columns = React.useMemo<ColumnDef<T, any>[]>(
    () =>
      canSelect
        ? [
            {
              id: "select",
              header: ({ table }) => (
                <IndeterminateCheckbox
                  {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                  }}
                />
              ),
              cell: ({ row }) => (
                <div className="px-1">
                  <IndeterminateCheckbox
                    {...{
                      checked: row.getIsSelected(),
                      disabled: !row.getCanSelect(),
                      indeterminate: row.getIsSomeSelected(),
                      onChange: row.getToggleSelectedHandler(),
                    }}
                  />
                </div>
              ),
            },
            ...defaultColumns,
          ]
        : defaultColumns,
    [canSelect, defaultData]
  );

  const table = useReactTable({
    data: defaultData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  /* Listen for selected rows and passes up to parent */
  React.useEffect(() => {
    if (table.getSelectedRowModel().flatRows.length === 0) {
      table.resetRowSelection();
    }

    if (canSelect && handleSelectedRows) {
      const selectedRows = table.getSelectedRowModel().flatRows.map((row) => row.original);

      handleSelectedRows(selectedRows);
    }
  }, [table.getState().rowSelection, defaultData]);

  /* Trigger reset of row selection after parent increments the reset counter */
  React.useEffect(() => {
    if (resetCounter > 0) {
      table.resetRowSelection();
    }
  }, [resetCounter]);

  const sortOptions: Record<string, React.ReactNode> = {
    asc: <IconArrowUp size={14} />,
    desc: <IconArrowDown size={14} />,
  };

  return (
    <div>
      <Group justify="space-between" mb="sm">
        <Group>
          <DebouncedInput
            leftSection={<IconSearch size="1rem" />}
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 font-lg shadow border border-block"
            placeholder="Search for any item..."
          />

          {canSelect && selectionMenu && <>{selectionMenu}</>}
        </Group>
        {actionButton && actionButton}
      </Group>

      <Table.ScrollContainer minWidth={300}>
        <Table highlightOnHover verticalSpacing="md">
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <Box
                        style={{ cursor: "pointer" }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <Group gap="xs">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.columnDef.header === "Action" ||
                          header.column.id === "select" ? null : (
                            <>
                              {sortOptions[header.column.getIsSorted() as string] ?? (
                                <IconArrowsDownUp size={14} />
                              )}
                            </>
                          )}
                        </Group>
                      </Box>
                    )}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>

          <Table.Tbody>
            {table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Divider mb="md" />
      <Group justify="space-between">
        <Text ml="sm">{table.getRowCount()} Entries</Text>
        <Group className="flex items-center gap-1">
          <ActionIcon
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            variant="default"
            size="lg"
          >
            <IconChevronsLeft size={14} />
          </ActionIcon>
          <ActionIcon
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            size="lg"
            variant="default"
          >
            <IconChevronLeft size={14} />
          </ActionIcon>
          <Text>Page</Text>
          <NumberInput
            maw={70}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e ? Number(e) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
          <Text>of {table.getPageCount()}</Text>
          <ActionIcon
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            size="lg"
            variant="default"
          >
            <IconChevronRight size={14} />
          </ActionIcon>
          <ActionIcon
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            size="lg"
            variant="default"
          >
            <IconChevronsRight size={14} />
          </ActionIcon>
        </Group>
        <Select
          maw={120}
          mr="sm"
          variant="subtle"
          value={table.getState().pagination.pageSize.toFixed(0)}
          onChange={(e) => {
            table.setPageSize(Number(e ?? "10"));
          }}
          data={[
            { value: "10", label: "Show 10" },
            { value: "20", label: "Show 20" },
            { value: "30", label: "Show 30" },
            { value: "40", label: "Show 40" },
            { value: "50", label: "Show 50" },
          ]}
        />
      </Group>
    </div>
  );
};
export default DynamicTable;

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      style={{ cursor: "pointer" }}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}
