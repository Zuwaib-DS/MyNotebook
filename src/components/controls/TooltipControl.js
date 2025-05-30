import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function TooltipControl({children, text}) {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="button-tooltip">{text}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
}

export default TooltipControl;