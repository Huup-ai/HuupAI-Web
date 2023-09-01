import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';

import { CPUsData, CPUsGrid } from '../data/dummy';
import { Header} from '../components';

const CPU = () => {
  const toolbarOptions = ['Search'];

  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };

  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:p-20 bg-white rounded-3xl">
      
      <Header category="CPU" title="Save big on your cloud services" />
      <GridComponent
        rowHeight={70}
        dataSource={CPUsData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        allowTextWrap={true}
        textWrapSettings={settings}
      >
        <ColumnsDirective >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {CPUsGrid.map((item, index) => <ColumnDirective clipMode='EllipsisWithTooltip' key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />

      </GridComponent>
    </div>
  );
};
export default CPU;