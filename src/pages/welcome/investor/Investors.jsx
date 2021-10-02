import { Box, Paper } from "@material-ui/core";
import React from "react";
import Wrapper from "../Wrapper";
import InvestorTab from "./tabs/InvestorTab";

export default function Investors() {
  const onTabValue = (val) => {
    switch (val) {
      case 1:
        window.location.hash = "#ecosystem";
        break;
      case 2:
        window.location.hash = "#roadmap";
        break;
      default:
        window.location.hash = "#";
    }
  };

  return (
    <Wrapper investor onTabValue={onTabValue}>
      <Paper>
        <TabPanel value={0} index={0}>
          <InvestorTab />
        </TabPanel>
      </Paper>
    </Wrapper>
  );
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
