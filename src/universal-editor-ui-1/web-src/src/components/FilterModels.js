import React, { useState, useEffect } from "react";
import { Provider, Button, Content } from "@adobe/react-spectrum";
import { Image, TableView, TableBody, Row, Cell, TableHeader, Column } from '@adobe/react-spectrum'
import { attach } from "@adobe/uix-guest";
import { lightTheme } from "@adobe/react-spectrum";
import { extensionId, test } from "./Constants";
import metadata from '../../../../app-metadata.json';
import { register } from "@adobe/uix-guest";
import actionWebInvoke from "../utils";
import config from '../config.json';

export default FilterModels = (params) => {
  let [selectedKeys, setSelectedKeys] = useState(new Set());
  const [products, setProducts] = useState(new Set());
  const [columns, setColumns] = useState(new Set());
  const [guestConnection, setGuestConnection] = useState();
  console.log(params);

  useEffect(() => {
    const init = async () => {
      // connect to the host 
      const connection = await attach({ id: extensionId });
      console.log(connection);
      setGuestConnection(connection);
    };
    init().catch((e) =>
      console.log("Extension got the error during initialization:", e)
    );

  }, []);

  useEffect(() => {
    const init = async () => {
      const { columns, data } = await actionWebInvoke(config['get-products'])
      console.log("Products fetched:", columns, data);
      setProducts(data);
      setColumns(columns);
    };
    init().catch((e) =>
      console.log("Error fetching products:", e)
    );
  }, []);

  const onCloseHandler = () => {
    console.log(guestConnection);
    guestConnection.host.modal.close();
  };
  console.log("Selected items:", [...selectedKeys].join(', '));
  console.log("Products:", products);
  return (
    <Provider theme={lightTheme} colorScheme="light">
      <Content width="100%">
        {products && columns && (<TableView
          aria-label="Table with controlled selection"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}>
          <TableHeader columns={columns}>
            {(column) => (
              <Column key={column.id} width={Number(column.width)}>{column.name}</Column>
            )}
          </TableHeader>
          <TableBody items={products}>
            {(row) => (
              <Row key={row.sku}>
                {(key) => (
                  <Cell>{key.includes('image') ? <Image src={row[key]} width="50px" /> : row[key]}</Cell>
                )}
              </Row>
            )}
          </TableBody>
        </TableView>)}
        <Button variant="primary" onPress={onCloseHandler} position="fixed" bottom="0px" right="8px">
          Close
        </Button>
      </Content>
    </Provider>
  );


}