/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/15/21
 * Time: 10:58 PM
 */

export function convertDate(date){
    const today = new Date(date);
    return today.getDate()
        + '-' +
        parseInt(today.getMonth() + 1)
        + '-' +
        today.getFullYear();
}

export  function volumePercentage(all,volume){
    return (volume/all)*100;
}
