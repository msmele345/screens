import { ReactElement, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }


const TabLayoutContainer = (): ReactElement => {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    return (
        <>
            <div>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Item One"/>
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={tabValue} index={0}>
                    Item One
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}>
                    Item Two
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}>
                    Item Three
                </CustomTabPanel>

            </div>
        </>
    )
};

export default TabLayoutContainer;