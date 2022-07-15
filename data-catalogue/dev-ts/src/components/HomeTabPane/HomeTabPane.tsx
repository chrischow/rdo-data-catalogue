import React from "react";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import { DatasetCard } from "../DatasetCard/DatasetCard";
import { NoResultsText } from "../NoResultsText/NoResultsText";
import { TableCard } from "../TableCard/TableCard";
import { ColumnSchema } from "../../utils/utils";
import { Link } from "react-router-dom";
import { BiHash } from "react-icons/bi";

interface HomeTabPaneProps {
  entityType: string;
  mainData: object[];
  filteredData: object[];
  keywords: string;
}

interface THeadProps {
  entityType: string;
}

export const HomeTabPaneCards: React.FC<HomeTabPaneProps> = (props) => {
  return (
    <Tab.Pane eventKey={props.entityType}>
      {props.mainData.length > 0 && props.filteredData.length > 0 &&
        props.filteredData.map((elem: any) => {
          if (props.entityType === 'datasets') {
            return <DatasetCard key={elem.Title} {...elem} />
          } else if (props.entityType === 'tables') {
            return <TableCard key={elem.Title} {...elem} />
          }
        })
      }
      {props.mainData.length > 0 && props.filteredData.length === 0 &&
        <NoResultsText keywords={props.keywords} />
      }
    </Tab.Pane>
  );
};

const THead: React.FC<THeadProps> = (props) => {
  if (props.entityType === 'columns') {
    return (
      <thead className="strong">
        <tr>
          <td>Title</td>
          <td>Description</td>
          <td>Data Type</td>
          <td>Business Rules</td>
        </tr>
      </thead>
    );
  }
  return (
    <thead className="strong">
      <tr>
        <td>Term</td>
        <td>Definition</td>
        <td>Business Rules</td>
        <td>Source</td>
      </tr>
    </thead>
  );
};

export const HomeTabPaneTable: React.FC<HomeTabPaneProps> = (props) => {
  return (
    <Tab.Pane eventKey={props.entityType}>
      {props.mainData.length > 0 && props.filteredData.length > 0 &&
        <Table striped responsive className="table column-table">
          {<THead entityType={props.entityType} />}
          <tbody>
          {(props.entityType === 'columns') && props.filteredData.map((column: any) => {
            return (
              <tr key={column.Id}>
                <td>{column.Title}</td>
                <td>{column.columnDescription}</td>
                <td className="datatype-cell">{column.dataType}</td>
                <td>{column.businessRules}</td>
              </tr>
            );
          })}
          {(props.entityType === 'terms') && props.filteredData.map((term: any) => {
            return (
              <tr key={term.Id}>
                <td>
                  <Link className="term-link" to={`/term/${term.Id}`}>
                    <BiHash style={{ marginRight: '1px' }} />
                    {term.Title}
                  </Link>
                </td>
                <td>{term.definition}</td>
                <td>{term.businessRules}</td>
                <td>{term.Source}</td>
              </tr>
            );
          })}
          </tbody>
        </Table>
      }
      {props.mainData.length > 0 && props.filteredData.length === 0 &&
        <NoResultsText keywords={props.keywords} />
      }
    </Tab.Pane>
  )
}