/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/5/21
 * Time: 1:35 AM
 */
import React, {Fragment} from 'react';
import {Table, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
const columns = [
    { id: 'star', label: '#', minWidth: 10 },
    { id: 'ash', label: '', minWidth: 10 },
    { id: 'image', label: 'Coin', minWidth: 25 },
    { id: 'name', label: '', minWidth: 25 },
    { id: 'symbol', label: '', minWidth: 50 },
    { id: 'price_change_24h', label: 'Price', minWidth: 100 },
    { id: 'h_1', label: '1h', minWidth: 100 },
    { id: 'high_24hr', label: '24h', minWidth: 100 },
    { id: 'd_7', label: '7d', minWidth: 100 },
    { id: 'volume_24', label: '24h Volume', minWidth: 100 },
    { id: 'market_cap', label: 'Mkt Cap', minWidth: 100 },
    { id: 'last_7_days', label: 'Last 7 days', minWidth: 100 },
];
export default function WatchList ()
{
    return(
      <Fragment>

          <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                      <TableRow>
                          {columns.map((column) => (
                              <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                      minWidth:
                                      column.minWidth,
                                      backgroundColor:
                                          '#3e4041',
                                      color: '#fff',
                                  }}
                              >
                                  {column.label}
                              </TableCell>
                          ))}
                      </TableRow>
                  </TableHead>
              </Table>
          </TableContainer>
          <Typography color='textPrimary' className="m-5 text-center">
              <h4>
                  <strong>Your Watchlist is empty</strong>
              </h4>
              <p>
                  Start building your watchlist by
                  clicking button bellow
              </p>
              <button type="button" className="btn btn-primary btn-lg btn-block w-25">
                  Add Coins
              </button>
              <br />
              <a className="text-primary">
                  Visit Cryptogazing
              </a>
          </Typography>

      </Fragment>);
}
