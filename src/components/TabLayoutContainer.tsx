import { ReactElement, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StorageImagesList, { ImagesListProps } from "./StorageImagesList";
import '../App.css';

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

const TabLayoutContainer = ({ images = [] }: ImagesListProps): ReactElement => {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    const parseTabLabels = (images: Record<string, unknown>[]): string[] => {
        const years = images.map((image) => {
            const parts = (image.name as string).split("_");
            return parts[0];
        })
        return years;
    }


    const setTabs = (images: Record<string, unknown>[]) => {
        const labels: string[] = parseTabLabels(images);

        const uniqueYears = [...new Set(labels)];

        const tabs = uniqueYears.map((year, index) => {
            return <Tab label={year} key={index} />;
        })
        return tabs;
    };

    const sortYears = (stringYears: string[]): string[] => {
        return stringYears.sort((a, b) => {
            if(a > b) {
                return -1
            } else {
                return 1;
            }
        });
    }

    const setPanels = (images: Record<string, unknown>[], tabValue: number) => {
        const years = parseTabLabels(images);

        // console.log("!!!!!sorted ", sortYears(years));
        return years.map((year, index) => {
            return (
                <CustomTabPanel value={tabValue} index={index}>
                    <StorageImagesList images={images.filter(img => (img.name as string).includes(year))} />
                </CustomTabPanel>
            )
        })
    }

    return (
        <>
            <div>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                    value={tabValue} 
                    centered
                    onChange={handleChange} 
                    aria-label="basic tabs example"
                    textColor="inherit"
                    indicatorColor= "secondary"
                    >
                        {setTabs(images)}
                    </Tabs>
                </Box>
                { setPanels(images, tabValue) }
            </div>
        </>
    )
};

export default TabLayoutContainer;