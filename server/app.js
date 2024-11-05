const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
const cookieparser = require("cookie-parser");

// database
const DBconnections = require("./database/connection");

// session
const expressSession = require("express-session");
const SessionStore = require("express-session-sequelize")(expressSession.Store);

// session set up
const sequelizeSessionStore = new SessionStore({
  db: DBconnections,
});

app.use(
  expressSession({
    key: "keyin",
    secret: "keep it secret, keep it safe.",
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6 * 60 * 60 * 1000, // 6 hours in milliseconds
    },
  })
);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors()); // Use the cors middleware

// Enable cookieparser
app.use(cookieparser());

// initialize database model
const BooksModel = require("./model/Books");
const ClassificationModel = require("./model/classifications");
const OTPModel = require("./model/OTP.js");
const UserModel = require("./model/user");
const LRNModel = require("./model/lrn");
const RequestModel = require("./model/request");
const ViolationsModel = require("./model/violations");
const BookmarkModel = require("./model/Bookmark");
const NotificationsModel = require("./model/Notifications.js");

// Auth Routes
const AuthRouter = require("./routes/auth.js");
const ForgotPasswordRoute = require("./routes/student/Forgot_Password.js")
const LRNRouter = require("./routes/admin/LRN");
const connections = require("./database/connection");
const Admin = require("./routes/admin/Base1.js");
const AdminBook = require("./routes/admin/Book.js");
const AdminRequest = require("./routes/admin/Request.js")
const AdminStudent = require("./routes/admin/Student.js");
const AdminViolations = require("./routes/admin/Violations.js");
const Classifications = require("./routes/classifications.js");

const AnalyticsRoute = require("./routes/admin/Analytics.js");

const StudentBookRoute = require("./routes/student/Books.js");
const StudentRequestRoute = require("./routes/student/Request.js")
const StudentBookmarmRoute = require("./routes/student/Bookmark.js");
const StudentProfileRoute = require("./routes/student/Profile.js");
const StudentNotifications = require("./routes/student/Notifications");

const RegisterRoute = require("./routes/register.js");
const LoginandsessionRoute = require('./routes/login.js');
const LogOutRotue = require("./routes/logout.js");

const TestRoute = require("./routes/test.js");
// Routes Use App
app.use(AuthRouter); // Aunthetication

app.use("/admin", Admin); // admin route
app.use("/admin", AdminBook); // admin route
app.use("/admin", LRNRouter); // LRN ROUTER
app.use("/admin", AdminRequest); // Request ROUTER
app.use("/admin", AdminStudent); // Student
app.use("/admin", AdminViolations); // Violations route
app.use("/admin/analytics", AnalyticsRoute)


app.use("/register", RegisterRoute);
app.use("/session", LoginandsessionRoute);
app.use(ForgotPasswordRoute)

app.use("/student", StudentBookRoute);
app.use("/student", StudentRequestRoute);
app.use("/student/bookmark", StudentBookmarmRoute);
app.use("/student", StudentProfileRoute)
app.use("/student", StudentNotifications)

app.use(RegisterRoute); // register route
app.use(LogOutRotue); // logout route

app.use(Classifications); // LRN ROUTER
app.use("/test", TestRoute); // Test Route

connections
  .sync() //{ alter: rue } // change without dropping data
  .then((result) => {
    app.listen(5000, () => {
      console.log("Local: http://localhost:5000 ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
