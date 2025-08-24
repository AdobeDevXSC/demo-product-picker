import React, { useState, useEffect } from "react";
import { Provider, Button, Content } from "@adobe/react-spectrum";
import { Image, TableView, TableBody, Row, Cell, TableHeader, Column, Flex } from '@adobe/react-spectrum'
import { attach } from "@adobe/uix-guest";
import { lightTheme } from "@adobe/react-spectrum";
import { extensionId } from "./Constants";
import actionWebInvoke from "../utils";
import config from '../config.json';
import { useParams } from 'react-router-dom';

export default FilterModels = () => {
  let [selectedKeys, setSelectedKeys] = useState(new Set());
  const [products, setProducts] = useState(new Set());
  const [columns, setColumns] = useState(new Set());
  const [guestConnection, setGuestConnection] = useState();
  const { id, type, rendererId } = useParams();
 
  useEffect(() => {
    const init = async () => {
      // connect to the host 
      const connection = await attach({ id: extensionId });
      setGuestConnection(connection);
    };
    init().catch((e) =>
      console.log("Extension got the error during initialization:", e)
    );

  }, []);

  useEffect(() => {
    const init = async () => {
      const { columns, data } = await actionWebInvoke(config['get-products'])
      setProducts(data);
      setColumns(columns);
    };
    init().catch((e) =>
      console.log("Error fetching products:", e)
    );
  }, []);

  const onUpdateHandler = async () => {
    const upd = [...selectedKeys].join(',');
    if(upd === '') return;
    guestConnection.host.editorActions.update({ target: { editable: { id: id, type: type } }, patch: [{ op: "replace", path: `/${rendererId}`, value: upd }] })
    guestConnection.host.editorActions.refreshPage();
    guestConnection.host.modal.close();
  };

  const onCloseHandler = async () => {
    guestConnection.host.modal.close();
  };
  // console.log("Selected items:", [...selectedKeys].join(', '));
  // console.log("Products:", products);
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
        <Flex direction="row" height="size-800" gap="size-100" margin={'10px'} justifyContent={"end"}>
          <Button variant="accent" onPress={onUpdateHandler}>
            Update
          </Button>
          <Button variant="primary" onPress={onCloseHandler}>
            Close
          </Button>
        </Flex>
      </Content>
    </Provider>
  );


}