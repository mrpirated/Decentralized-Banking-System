import MaterialTable from "material-table";
import React from "react";

export default function DataTable(props) {
	let len = 0;
	let options = {
		// filtering: true,
		paging: true,
		pageSize: 10,
		pageSizeOptions: [10, 50, 100, 500, { value: len, label: "All" }],
		exportButton: true,
	};
	if (props.data && props.data.length > 0) {
		len = props.data.length;
	}
	if (props.options) {
		options = props.options;
	}
	return (
		<React.Fragment>
			<MaterialTable
				title={props.title}
				data={props.data}
				columns={props.columns}
				actions={props.actions}
				options={options}
				isEditable={true}
			/>
		</React.Fragment>
	);
}
