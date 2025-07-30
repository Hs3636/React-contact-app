# 📱 Contact Management Application

A modern, full-featured contact management application built with React, Redux Toolkit, and localStorage for persistent data storage. This project demonstrates comprehensive understanding of React ecosystem, state management, routing, form handling, and data validation.

## 🚀 Features

### 🔐 Authentication System
- **User Registration & Login** with form validation
- **Cookie-based Authentication** using `js-cookie`
- **Protected Routes** with automatic redirects
- **Session Management** with Redux state persistence

### 👥 Contact Management (CRUD Operations)
- **Create Contacts** with profile pictures and favorites
- **Read/View Contacts** in card layout and detailed view
- **Update Contacts** with inline editing capabilities
- **Delete Contacts** with confirmation dialogs
- **Favorites System** to mark important contacts

### 📊 Data Management
- **CSV Import** with Zod validation and error reporting
- **CSV Export** functionality for backup/sharing
- **Bulk Operations** for managing multiple contacts
- **Data Persistence** using localStorage with user isolation

### 🎨 User Interface
- **Responsive Design** with Material-UI components
- **Dynamic Navigation** with React Router
- **Toast Notifications** for user feedback
- **Modal Dialogs** for forms and confirmations
- **Loading States** and error handling

### 📁 Advanced Features
- **Contact Filtering** (All Contacts, Favorites)
- **Profile Image Upload** with preview
- **Form Validation** using React Hook Form + Zod
- **Error Boundaries** and 404 page handling
- **User Profile Management** with dropdown menu

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.1.0** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **JSX** - Component-based architecture

### State Management
- **Redux Toolkit (RTK) 2.8.2** - Predictable state container
- **React-Redux 9.2.0** - Official React bindings for Redux
- **Redux Slices** - Simplified reducer logic with RTK

### Routing & Navigation
- **React Router DOM 7.6.2** - Declarative routing
- **Protected Routes** - Authentication-based navigation
- **Nested Routing** - Complex route hierarchies

### Form Management & Validation
- **React Hook Form 7.59.0** - Performant forms with easy validation
- **Zod 3.25.72** - TypeScript-first schema validation
- **Custom Validation** - Real-time form feedback

### UI Components & Styling
- **Material-UI 7.1.2** - React component library
- **React Bootstrap 2.10.10** - Bootstrap components for React
- **React Icons 5.5.0** - Popular icon library
- **Custom CSS** - Responsive design with Flexbox/Grid

### Data Processing & Storage
- **localStorage** - Client-side data persistence
- **js-cookie 3.0.5** - Cookie management for authentication
- **PapaParse 5.5.3** - CSV parsing and processing
- **React-CSV 2.2.2** - CSV export functionality

### Developer Experience
- **ESLint** - Code linting and formatting
- **React DevTools** compatible
- **Hot Module Replacement** - Fast development

## 📂 Project Structure

```
src/
├── app/
│   └── store.js                 # Redux store configuration
├── components/
│   ├── AddContactModal.jsx      # Create contact form
│   ├── ContactCard.jsx          # Contact display card
│   ├── ContactDisplay.jsx       # Detailed contact view
│   ├── EditContactModal.jsx     # Edit contact form
│   ├── ErrorPage.jsx            # 404 error page
│   ├── Home.jsx                 # Main dashboard
│   ├── HomeIndex.jsx            # Contact list view
│   ├── ImportContactsModal.jsx  # CSV import functionality
│   ├── Navbar.jsx               # Navigation header
│   ├── SignIn.jsx               # Login form
│   └── SignUp.jsx               # Registration form
├── features/
│   ├── Auth/
│   │   └── authSlice.js         # Authentication state management
│   ├── Contacts/
│   │   └── contactSlice.js      # Contact CRUD operations
│   └── Users/
│       └── userSlice.js         # User management
├── routes/
│   ├── Layout.jsx               # App layout wrapper
│   ├── Protected.jsx            # Protected route component
│   └── PublicRoute.jsx          # Public route component
├── assets/                      # Images and static files
├── main.jsx                     # App entry point
└── styles.css                   # Global styles
```

## 🔧 Redux Architecture

### Store Configuration
```javascript
export const store = configureStore({
    reducer: {
        users: userReducer,      // User management
        auth: authReducer,       // Authentication state
        contact: contactReducer  // Contact operations
    }
})
```

### State Management Features
- **Immutable Updates** with Redux Toolkit
- **Action Creators** auto-generated from slices
- **Middleware Integration** for async operations
- **DevTools Support** for debugging

## 🗄️ Data Storage Strategy

### localStorage Implementation
- **User Isolation** - Each user's contacts are separated
- **Data Persistence** - Survives browser sessions
- **JSON Serialization** - Complex objects stored efficiently
- **Error Handling** - Graceful fallbacks for storage issues

### Cookie Authentication
- **Secure Sessions** - HTTP-only cookies for auth tokens
- **Auto-expiration** - Session management
- **Cross-tab Synchronization** - Consistent auth state

## 🎯 Key React Concepts Demonstrated

### Hooks Usage
- `useState` - Local component state
- `useEffect` - Side effects and lifecycle
- `useDispatch` - Redux actions
- `useSelector` - Redux state selection
- `useNavigate` - Programmatic navigation
- `useParams` - URL parameter extraction
- `useForm` - Form state management

### Component Patterns
- **Higher-Order Components** - Route protection
- **Render Props** - Flexible component composition
- **Custom Hooks** - Reusable stateful logic
- **Controlled Components** - Form inputs
- **Conditional Rendering** - Dynamic UI

### Performance Optimization
- **Memoization** with React.memo
- **Lazy Loading** - Code splitting opportunities
- **Efficient Re-renders** - Proper dependency arrays
- **State Normalization** - Redux best practices

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone [repository-url]
cd contact-app-full-task
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Build for Production
```bash
npm run build
npm run preview
```

## 📱 Usage Guide

### Getting Started
1. **Sign Up** - Create a new account with email and password
2. **Sign In** - Login with your credentials
3. **Dashboard** - Access your contact management interface

### Managing Contacts
- **Add Contact** - Click "Create Contact" button
- **View Contacts** - Browse all contacts or favorites only
- **Edit Contact** - Click edit button on any contact
- **Delete Contact** - Remove contacts with confirmation
- **Favorites** - Mark important contacts with heart icon

### Data Import/Export
- **Import** - Upload CSV files with contact data
- **Export** - Download your contacts as CSV
- **Validation** - Automatic data validation on import

## 🔒 Security Features

- **Input Validation** - All forms validated client-side
- **Data Sanitization** - XSS prevention
- **Route Protection** - Authentication-based access
- **Session Management** - Secure cookie handling

## 🌟 Advanced Features Showcase

### Form Validation Pipeline
```javascript
// Zod schema validation
const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email required"),
    phone: z.string().regex(/^\d{10}$/, "Valid phone number required"),
    fav: z.string().transform((val) => val === "true"),
});

// React Hook Form integration
const { register, handleSubmit, formState: { errors } } = useForm();
```

### Redux State Management
```javascript
// Async state updates with localStorage sync
addContact: (state, action) => {
    const updatedContacts = [...state.contacts, action.payload];
    state.contacts = updatedContacts;
    const allContacts = JSON.parse(localStorage.getItem('contacts')) || []; 
    const updatedAllContacts = [...allContacts, action.payload];
    localStorage.setItem('contacts', JSON.stringify(updatedAllContacts));
}
```

## 🚀 Future Enhancements

- **Real-time Sync** - WebSocket integration
- **Advanced Search** - Full-text search capabilities
- **Contact Groups** - Organize contacts in categories
- **Backup/Restore** - Cloud storage integration
- **Mobile App** - React Native version
- **API Integration** - Backend service connection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

This project demonstrates comprehensive React development skills including:
- **Modern React Patterns** - Hooks, Context, and functional components
- **State Management** - Redux Toolkit with best practices
- **Form Handling** - Validation, submission, and user experience
- **Routing** - Complex navigation with authentication
- **Data Persistence** - localStorage with user isolation
- **UI/UX Design** - Responsive and intuitive interface
- **Code Organization** - Scalable project structure
- **Performance** - Optimized rendering and state updates

---

Built with ❤️ using React, Redux Toolkit, and modern web technologies.
