import { SSRProvider } from '@nextui-org/react';
import { Card, Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

export default function Cards(props) {
  console.log(props.buttonValue)
  return (
    <div className="parent-card" >
        <Card isHoverable variant="bordered" css={{ mw: "500px",marginBottom:"10px" }}>
            <Card.Body>
            <Checkbox color="success" onChange={props.onCheck} isSelected={props.buttonValue}><Text css={{fontSize:"16px", fontWeight:"bolder"}}>{props.description}</Text></Checkbox>
            </Card.Body>
            <div style={{ display: 'flex',marginTop:"5px" }}>
              <Button shadow color="error" onPress={props.onclick} auto css={{ mw: "100px", marginRight: '8px' }}>Delete</Button>
              <Button shadow color="warning" onPress={props.onUpdate} auto css={{ mw: "100px" }}>Update</Button>
            </div>
            
        </Card>
    </div>
  );
}