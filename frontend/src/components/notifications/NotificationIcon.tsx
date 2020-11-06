import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import classNames from "classnames";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { NotificationLevel } from "../../common/notifications";

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
}));

interface NotificationIconProps {
    level?: NotificationLevel;
}
export default function NotificationIcon(props: NotificationIconProps) {
    const { level } = props;
    const classes = useStyles();

    const renderIcon = () => {
        switch (level) {
            case NotificationLevel.Success:
                return <CheckCircleIcon className={classNames(classes.icon, classes.iconVariant)} />;
            case NotificationLevel.Warning:
                return <WarningIcon className={classNames(classes.icon, classes.iconVariant)} />;
            case NotificationLevel.Error:
                return <ErrorIcon className={classNames(classes.icon, classes.iconVariant)} />;
            case NotificationLevel.Info:
                return <InfoIcon className={classNames(classes.icon, classes.iconVariant)} />;
            default:
                return null;
        }
    };

    return renderIcon();
}
