<Stack height="100%" maxHeight="100%" width="100%">
<Stack
  flexDirection="row"
  alignItems="center"
  justifyContent="space-between"
  mb={2}
>
  <SearchField
    onChange={(e) => console.log(`Search Field Value: ${e.target.value}`)}
  />
  <Stack flexDirection="row">
    <Checkbox
      size="small"
      checked={status === false}
      inputProps={{ "aria-label": "controlled" }}
      sx={{ color: theme.palette.secondary.main, mb: "2px", p: 0 }}
      onClick={() => console.log("Status change viewing")}
    />
    <Typography fontSize="small" mr={1}>
      Archived
    </Typography>
  </Stack>
</Stack>
<Stack>
  {isLoading ? (
    <LoadingData />
  ) : totalCount > 0 ? (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Head Cell</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            {
              name: "Table Body",
            },
          ]?.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                { label: "All", value: totalCount },
              ]}
              colSpan={6}
              count={totalCount}
              page={page}
              rowsPerPage={pageSize}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              // onPageChange={handleChangePage}
              // onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ) : (
    <ZeroRecordsFound />
  )}
</Stack>
</Stack>