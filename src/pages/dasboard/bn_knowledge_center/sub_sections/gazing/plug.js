/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/22/21
 * Time: 1:12 PM
 */
import axios from 'axios';

export const coinGecko = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    responseType: 'json',
});
