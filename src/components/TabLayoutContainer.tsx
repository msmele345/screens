import { ReactElement, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StorageImagesList, { ImagesListProps } from "./StorageImagesList";

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
        const tabYears2: string[] = [];
        const labels2: string[] = parseTabLabels(images);

        labels2.forEach(year => { //move this into parseLabels();
            if (!tabYears2.includes(year)) {
                console.log("HERE")
                tabYears2.push(year);
            }
        })

        const labels = tabYears2.map(year => {
            return <Tab label={year} />;
        })
        return labels;
    };

    const setPanels = (images: Record<string, unknown>[], tabValue: number) => {
        const years = parseTabLabels(images);
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
                {parseTabLabels(images)}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                        {setTabs(images)}
                        {
                            /* <Tab label="2019"/>
                            <Tab label="2021" /> 
                            <Tab label="2024" /> 
                            */
                        }
                    </Tabs>
                </Box>

                { setPanels(images, tabValue) }

            </div>
        </>
    )
};

export default TabLayoutContainer;