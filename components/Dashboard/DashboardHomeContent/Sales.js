import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from 'react';


export const Sales = (props) => {
    const [news, setNews] = useState([])
    useEffect(() => {
        fetch('/api/news')
            .then(response => response.json())
            .then(json => setNews(json))
            .catch(error => console.log(error))
    }, [])
    const all = news.map(item => item?.category)
    const occurrences = all.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});
    const numberOfNews = Object.values(occurrences)
    const categories = [...new Set(all)];
    const theme = useTheme();
    const data = {
        datasets: [
            {
                backgroundColor: '#EF4444',
                barPercentage: 0.5,
                barThickness: 20,
                borderRadius: 0,
                categoryPercentage: 0.5,
                data: numberOfNews,
                maxBarThickness: 50
            },

        ],
        labels: categories
    };

    const options = {
        animation: false,
        cornerRadius: 20,
        layout: { padding: 0 },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        xAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary
                },
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary,
                    beginAtZero: true,
                    min: 0
                },
                gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: theme.palette.divider,
                    drawBorder: false,
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                    zeroLineColor: theme.palette.divider
                }
            }
        ],
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    return (
        <Card {...props}>
            <CardHeader
                action={(
                    <Button endIcon={<ArrowDropDownIcon fontSize="small" />} size="small"> Last 7 days </Button>
                )}
                title="Number of News By Category"
            />
            <Divider />
            <CardContent>
                <Box sx={{ height: 400, position: 'relative' }}>
                    <Bar data={data} options={options} />
                </Box>
            </CardContent>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }} >
            </Box>
        </Card>
    );
};
