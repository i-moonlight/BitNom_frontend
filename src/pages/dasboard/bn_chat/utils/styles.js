import { makeStyles } from "@material-ui/core";
import colors from "./colors";
export const useStyles = makeStyles((theme) => ({
  limit_text: {
    overflow: "hidden",
    whiteSpace: "nowrap !important",
    textOverflow: "ellipsis",
  },
  online_badge: {
    "& .MuiBadge-badge": {
      backgroundColor: colors.online_green,
    },
  },
}));
