/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/4/21
 * Time: 4:46 PM
 */
import React, { Component } from 'react';
import ApexCharts from 'react-apexcharts';

class PriceGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                data: this.props.sparkline.price
            }],
            options: {
                chart: {
                    type: 'line',
                    width: 100,
                    height: 35,
                    sparkline: {
                        enabled: true
                    }
                },
                tooltip: {
                    fixed: {
                        enabled: false
                    },
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function () {
                                return '';
                            }
                        }
                    },
                    marker: {
                        show: false
                    }
                },
                stroke: {
                    show: true,
                    curve: 'smooth',
                    lineCap: 'butt',
                    colors: 'red',
                    width: 1,
                    dashArray: 0,
                },
                colors:['#F44336', '#E91E63', '#9C27B0']
            }
        };
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <ApexCharts
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            height={35}
                            width={100}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default PriceGraph;
