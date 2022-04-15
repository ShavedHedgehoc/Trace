import React from 'react';

class ReportView extends React.Component {
    render() {
        return (
            <div>
                <table>
                    {this.props.data.map((row) => {
                       return( <tr>
                            <td>{row.product_id}</td>
                            <td>{row.product_name}</td>
                            <td>{row.plan ? `${parseFloat(row.plan)}` : `-`}</td>
                            <td>{row.fact ? `${parseFloat(row.fact)}` : `-`}</td>
                        </tr>
                       )
                    })
                    }
                </table>
            </div>
        )
    }
}

export default ReportView;