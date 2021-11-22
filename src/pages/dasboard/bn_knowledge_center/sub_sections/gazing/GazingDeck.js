/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/22/21
 * Time: 5:21 PM
 */

import React, { Fragment } from 'react';
import GazingCard from './GazingCard';


const CardDeck = ({
  coins = [],
  coin_index,
  onLike,
  onDislike,
  is_back = false,
  undo = () => null,
  show_back = false,
}) =>
{
    return (
        <Fragment>
            <GazingCard
                coin={coins.length ? coins[0] : {}}
                onLike={onLike}
                coin_index={is_back ? 2 : 0}
                onDislike={onDislike}
                show_back={false}
            />
            <GazingCard
                coin={coins.length ? coins[2] : {}}
                onLike={onLike}
                coin_index={coin_index === 2 ? 1 : 0}
                onDislike={onDislike}
                show_back={show_back}
                undo={undo}
            />
            <GazingCard
                coin={coins.length ? coins[1] : {}}
                onLike={onLike}
                coin_index={coin_index === 1 ? 1 : 0}
                onDislike={onDislike}
                undo={undo}
                show_back={show_back}
            />
            <GazingCard
                coin={coins.length ? coins[3] : {}}
                onLike={onLike}
                coin_index={coin_index === 3 ? 1 : 0}
                onDislike={onDislike}
                undo={undo}
                show_back={show_back}
            />
        </Fragment>
    );
};

export default CardDeck;

