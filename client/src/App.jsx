import Login from "./pages/auth/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { Toaster } from "react-hot-toast";
import EmployeeDashboard from "./pages/User/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import EmployeeView from "./components/employee/EmployeeView";
import EmployeeEdit from "./components/employee/EmployeeEdit";
import EmployeeSummary from "./components/employeedashboard/EmployeeSummary";
import HeadCookSummary from "./components/headcookdashboard/HeadCookSummary";
import HeadCookDashboard from "./pages/HeadCook/HeadCookDashboard";
import ManagerDashboard from "./pages/Manager/ManagerDashboard";
import ManagerSummary from "./components/manager/ManagerSummary";
import VoyagerDashboard from "./pages/Voyager/VoyagerDashboard";
import VoyagerSummary from "./components/voyagers/VoyagerSummary";
import AddMenus from "./components/menus/AddMenus";
import Item from "./components/menusitems/Item";
import AddTickets from "./components/tickets/AddTickets";
import StationeryOrderList from "./components/stationery/StationeryOrderList";
import CateringOrderList from "./components/catering/CateringOrderList";
import AdminMovieForm from "./components/tickets/AdminMovieForm";
import Orders from "./components/voyagers/Orders";
import OrderSummaryPage from "./components/voyagers/OrderSummaryPage";
import OrderSuccessPage from "./components/voyagers/OrderSuccessPage";
import ViewOrdersPage from "./components/voyagers/ViewOrdersPage";
import OrderList from "./components/orders/OrderList";
import OrderListById from "./components/orders/OrderListById";
import UserTicketBookingPage from "./components/tickets/UserTicketBookingPage";
import BookingList from "./components/tickets/BookingList";
import CreateSalonPage from "./components/salon/CreateSalonPage";
import SalonList from "./components/salon/SalonList";
import EditSalonPage from "./components/salon/EditSalonPage";
import ClubList from "./components/fitnessclub/ClubList";
import CreateClub from "./components/fitnessclub/CreateClub";
import EditClub from "./components/fitnessclub/EditClub";
import PartHallList from "./components/partyHall/PartHallList";

import EditPartyHall from "./components/partyHall/EditPartyHall";
import UserBookingsPage from "./components/tickets/UserBookingsPage";

import BookingPage from "./components/salon/BookingPage";
import FitnessBookingPage from "./components/fitnessclub/FitnessBookingPage";

import ViewTickets from "./components/manager/ViewTickets";
import ViewSalons from "./components/manager/ViewSalons";

import ViewFitnessCanter from "./components/manager/ViewFitnessCanter"
import ViewPartyHalls from "./components/manager/ViewPartyHalls"
import CreatepartyHalls from "./components/partyHall/CreatepartyHalls";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import PartyHallBookingPage from "./components/partyHall/PartyHallBookingPage";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Profile from "./profile/Profile";
import VoyagerProfile from "./pages/Voyager/VoyagerProfile";
import ManagerProfile from "./pages/Manager/ManagerProfile";
import HeadCookProfile from "./pages/HeadCook/HeadCookProfile";
import SupervisorProfile from "./pages/supervisor/SupervisorProfile";



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          {/* <Route path="/" element={<Navigate to="/admin-dashboard" />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/unautorized" element={<UnauthorizedPage />} />

          <Route path="*" element={<NotFound />} />



          {/* admin routes */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requireRole={["admin"]}>
                  <AdminDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<AdminSummary />}></Route>
            <Route path="/admin-dashboard/profile/:id" element={<Profile />}></Route>
            <Route
              path="/admin-dashboard/employees"
              element={<EmployeeList />}
            ></Route>
            <Route
              path="/admin-dashboard/add-employee"
              element={<AddEmployee />}
            ></Route>
            <Route path="/admin-dashboard/employee/edit/:id" element={<EmployeeEdit />}></Route>
            <Route path="/admin-dashboard/employee/:id" element={<EmployeeView />}></Route>
            <Route
              path="/admin-dashboard/departments"
              element={<DepartmentList />}
            ></Route>
            <Route
              path="/admin-dashboard/add-department"
              element={<AddDepartment />}
            ></Route>
            <Route
              path="/admin-dashboard/department/:id"
              element={<EditDepartment />}
            ></Route>
            <Route
              path="/admin-dashboard/menus"
              element={<AddMenus />}
            ></Route>
            <Route
              path="/admin-dashboard/items"
              element={<Item />}
            ></Route>
            <Route
              path="/admin-dashboard/tickets"
              element={<AdminMovieForm />}
            ></Route>
            <Route
              path="/admin-dashboard/fitness"
              element={<AddTickets />}
            ></Route>
            <Route
              path="/admin-dashboard/parties"
              element={<AdminMovieForm />}
            ></Route>
            <Route
              path="/admin-dashboard/order-list"
              element={<OrderList />}
            ></Route>
            <Route path="/admin-dashboard/salons" element={<SalonList />}></Route>
            <Route path="/admin-dashboard/salon/add" element={<CreateSalonPage />}></Route>
            <Route path="/admin-dashboard/salon/:id" element={<EditSalonPage />}></Route>
            <Route path="/admin-dashboard/clubs" element={<ClubList />}></Route>
            <Route path="/admin-dashboard/club/add" element={<CreateClub />}></Route>
            <Route path="/admin-dashboard/club/:id" element={<EditClub />}></Route>
            <Route path="/admin-dashboard/party-halls" element={<PartHallList />}></Route>
            <Route path="/admin-dashboard/party-hall/add" element={<CreatepartyHalls />}></Route>
            <Route path="/admin-dashboard/party-hall/:id" element={<EditPartyHall />}></Route>
          </Route>

          {/* supervisor route */}
          <Route
            path="/supervisor-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requireRole={["supervisor"]}>
                  <EmployeeDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<EmployeeSummary />}></Route>
            <Route
              path="/supervisor-dashboard/stationery-orders"
              element={<StationeryOrderList />}
            ></Route>
            <Route path="/supervisor-dashboard/profile/:id" element={<SupervisorProfile />}></Route>


          </Route>
          {/*Head Cook Routes*/}
          <Route
            path="/headcook-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requireRole={["headcook"]}>
                  <HeadCookDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<HeadCookSummary />}></Route>
            <Route
              path="/headcook-dashboard/catering-orders"
              element={<CateringOrderList />}
            ></Route>
            <Route path="/headcook-dashboard/profile/:id" element={<HeadCookProfile />}></Route>


          </Route>

          {/*Manager Routes*/}
          <Route
            path="/manager-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requireRole={["manager"]}>
                  <ManagerDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<ManagerSummary />}></Route>
            <Route path="/manager-dashboard/view-tickets" element={<ViewTickets />}></Route>
            <Route path="/manager-dashboard/profile/:id" element={<ManagerProfile />}></Route>

            <Route path="/manager-dashboard/view-salon" element={<ViewSalons />}></Route>
            <Route path="/manager-dashboard/view-fitnesscenter" element={<ViewFitnessCanter />}></Route>
            <Route path="/manager-dashboard/view-partyhalls" element={<ViewPartyHalls />}></Route>
          </Route>

          {/*Voyager Routes*/}
          <Route
            path="/voyager-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requireRole={["voyager"]}>
                  <VoyagerDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<VoyagerSummary />}></Route>
            <Route path="/voyager-dashboard/profile/:id" element={<VoyagerProfile />}></Route>
            <Route path="/voyager-dashboard/order-items" element={<Orders />} />
            <Route path="/voyager-dashboard/booking" element={<BookingList />} />
            <Route path="/voyager-dashboard/booking/movie-tickets" element={<UserTicketBookingPage />} />
            <Route path="/voyager-dashboard/booking/movie-ticket/:id" element={<UserBookingsPage />}></Route>
            <Route path="/voyager-dashboard/order-summary" element={<OrderSummaryPage />} />
            <Route path="/voyager-dashboard/success" element={<OrderSuccessPage />} />
            <Route path="/voyager-dashboard/orders/:userId" element={<ViewOrdersPage />} />
            <Route path="/voyager-dashboard/order-list/:id" element={<OrderListById />} />
            <Route path="/voyager-dashboard/booking/salon" element={<BookingPage />}></Route>
            <Route path="/voyager-dashboard/booking/club" element={<FitnessBookingPage />}></Route>
            <Route path="/voyager-dashboard/booking/party" element={<PartyHallBookingPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
