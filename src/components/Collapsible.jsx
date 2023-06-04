import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

function Collapsible(props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div>
      <Button
        className="btn btn-primary"
        variant="dark"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-controls={`collapse-${props.id_pertanyaan}`}
        aria-expanded={!isCollapsed}>
        {props.judul}
      </Button>
      <Collapse in={!isCollapsed}>
        <div id={`collapse-${props.id_pertanyaan}`}>
          <p>{props.jawab}</p>
        </div>
      </Collapse>
    </div>
  );
}

export default Collapsible;
