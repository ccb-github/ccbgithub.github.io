# Add pagination
```jsx
const ReactTable = () => {
  // Add this option to hook
  const reactTable = {
    getPaginationRowModel: getPaginationRowModel(),
  } = useReactTable()
}
``` 