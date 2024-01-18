// Datatable.tsx
import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';

interface DatatableProps {
  data: any[]; // Update the type based on your actual data structure
}

const Datatable: React.FC<DatatableProps> = ({ data }) => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const dataTableRef = useRef<DataTables.Api | null>(null);

  useEffect(() => {
    if (tableRef.current) {
      // Initialize DataTable with Responsive extension and custom styling
      dataTableRef.current = $(tableRef.current).DataTable({
        data: data,
        columns: [
          { title: 'Name', data: 'name' },
          { title: 'Age', data: 'age' },
          { title: 'Sex', data: 'sex' },
          { title: 'Mobile', data: 'mobile' },
          { title: 'Govt ID Type', data: 'govtIdType' },
          { title: 'Govt ID', data: 'govtId' },
          // Add additional columns as needed
        ],
        responsive: true, // Enable Responsive extension
        // Custom styling options
        columnDefs: [
          {
            targets: '_all',
            className: 'your-row-class', // Apply this class to all rows
          },
        ],
        headerCallback: function (thead, data, start, end, display) {
          $(thead).find('th').css('background-color', '#87CEEB'); // Light blue color for the header
        },
      });

      return () => {
        // Destroy the DataTable when the component unmounts to prevent memory leaks
        if (dataTableRef.current) {
          dataTableRef.current.destroy();
        }
      };
    }
  }, [data]);

  return <table ref={tableRef} />;
};

export default Datatable;
 