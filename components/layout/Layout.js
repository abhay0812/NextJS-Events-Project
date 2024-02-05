import React, { Fragment, useContext } from "react";

import MainHeader from "./MainHeader";
import Notification from '@/components/ui/Notification';

import NotificationContext from "@/store/NotificationContext";

const Layout = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;
  
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
         title={activeNotification.title}
         message={activeNotification.message}
         status={activeNotification.status} />
      )}
    </Fragment>
  );
};

export default Layout;
