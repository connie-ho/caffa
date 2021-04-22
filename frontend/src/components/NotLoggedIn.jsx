import React, { useContext } from "react";
import Login from "./Login";
import UserContext from "../contexts/UserContext";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotLoggedIn(props) {
  const { openLogin } = useContext(UserContext);
  const { handleLoginClose } = props;

  return (
    <div>
      <Dialog
        open={openLogin}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleLoginClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Login />
        </DialogContent>
      </Dialog>
    </div>
  );
}
