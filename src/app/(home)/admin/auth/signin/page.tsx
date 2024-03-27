import Login from "../../../../server/components/auth";

const AdminPanel: React.FC = () => {
    return (
        <div className="h-screen w-full h-full text-center pt-20">
            <h1>Admin Panel</h1>
            <Login />
        </div>
    );
}

export default AdminPanel;
