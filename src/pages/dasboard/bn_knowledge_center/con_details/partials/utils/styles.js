import { makeStyles } from '@mui/styles';

/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/15/21
 * Time: 10:51 PM
 */
export const customOverview = {
    tabStyle: {
        textTransform: 'capitalize',
    },
    buttonStyle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        backgroundColor: '#333333',
        margin: '5px 5px 5px 0',
        borderRadius: '50px',
        minWidth: '120px',
    },
    coinsBorder: {
        borderLeft: '5px solid blue',
        minWidth: '250px',
    },
    trendingCoins: {
        backgroundColor: '#b4b474',
        borderRadius: '25px',
    },
};

export const useStyles = makeStyles({
    bGActive: {
        backgroundColor: 'rgb(74 69 69)',
        textTransform: 'capitalize',
        marginRight: 8,
    },
    bGNormal: {
        textTransform: 'capitalize',
        marginRight: 8,
    },
    categoryActive: {
        backgroundColor: 'rgb(24 14 44)',
        textTransform: 'capitalize',
        color: '#0067ff',
        // width: '200px',
        paddingLeft: 0,
    },
    categoryNormal: {
        textTransform: 'capitalize',
        // width: '200px',
        paddingLeft: 0,
    },
    verticalActive: {
        textTransform: 'capitalize',
        color: '#0067ff',
    },
    verticalNormal: {
        textTransform: 'capitalize',
    },
});
