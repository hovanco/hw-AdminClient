import React, { FC, lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { NotFound } from '../../components';
import { DashboardLayout } from '../../layout';

// import pages
const DashboardHome = lazy(() => import('./pages/dashboard-home'));
const Customers = lazy(() => import('./pages/customers'));
const Stores = lazy(() => import('./pages/stores'));
const Fanpage = lazy(() => import('./pages/fanpage'));
const Users = lazy(() => import('./pages/users'));
const Billings = lazy(() => import('./pages/billings'));
const ReportFinancial = lazy(() => import('./pages/report-financinal'));
const ReportCustomer = lazy(() => import('./pages/report-customer'));


interface Props {}

const Dashboard: FC<Props> = () => {
    const match = useRouteMatch();
    return (
        <DashboardLayout>
            <Switch>
                <Redirect exact from={match.url} to={`${match.url}/overview`} />
                <Route component={DashboardHome} path={`${match.url}/overview`} />
                <Route component={Customers} path={`${match.url}/customers`} />
                <Route component={Billings} path={`${match.url}/billings`} />
                <Route
                    component={Stores}
                    path={[
                        `${match.url}/shops`,
                        `${match.url}/shops/:id`,
                        `${match.url}/shops/:id/order/:orderId`,
                    ]}
                    exact
                />
                <Route
                    component={ReportFinancial}
                    path={`${match.url}/reports/financinal`}
                />
                <Route
                    component={ReportCustomer}
                    path={`${match.url}/reports/customer`}
                />
                <Route component={Fanpage} path={`${match.url}/fanpage`} />
                <Route component={Users} path={`${match.url}/users`} />
                <Route>
                    <NotFound showHeader={false} />
                </Route>
            </Switch>
        </DashboardLayout>
    );
};

export default Dashboard;
