
import React, { useState, useEffect } from 'react';

// --- Icons (using simple text for prototype, replace with actual icon library like FontAwesome or Material Icons) ---
const Icon = ({ name, className = '' }) => <span className={`icon ${className}`}>{name}</span>;

// --- Dummy Data ---
const dummyProjects = [
    {
        id: 'P001', name: 'Solar Farm Alpha', type: 'Solar', status: 'Approved',
        customer: 'John Doe', coordinator: 'Alice Brown', siteEngineer: 'Bob Johnson', financeTeam: 'Carol White',
        startDate: '2023-01-15', endDate: '2023-06-30',
        kpis: { energyOutput: '5 MW', cost: '$1.2M' },
        activities: [{ id: 1, description: 'Application Submitted', timestamp: '2022-12-01', actor: 'John Doe' }, { id: 2, description: 'Site Inspection Completed', timestamp: '2023-01-20', actor: 'Bob Johnson' }],
        milestones: [{ name: 'Applied', completed: true, date: '2022-12-01' }, { name: 'Assigned', completed: true, date: '2022-12-10' }, { name: 'Inspected', completed: true, date: '2023-01-20' }, { name: 'Quoted', completed: true, date: '2023-02-05' }, { name: 'Approved', completed: true, date: '2023-02-15' }, { name: 'Executed', completed: false }],
        documents: [{ name: 'Application Form.pdf', url: '#', type: 'pdf' }, { name: 'Site Report.docx', url: '#', type: 'doc' }],
        financials: { quotationAmount: 1200000, actualCost: 1150000, status: 'Approved' },
        priority: 'High'
    },
    {
        id: 'P002', name: 'Wind Turbine Beta', type: 'Wind', status: 'Inspected',
        customer: 'Jane Smith', coordinator: 'Alice Brown', siteEngineer: 'Eve Davis', financeTeam: 'Frank Green',
        startDate: '2023-03-01', endDate: '2023-09-15',
        kpis: { energyOutput: '3 MW', cost: '$0.8M' },
        activities: [{ id: 1, description: 'Application Submitted', timestamp: '2023-02-10', actor: 'Jane Smith' }, { id: 2, description: 'Site Inspection Scheduled', timestamp: '2023-02-25', actor: 'Alice Brown' }],
        milestones: [{ name: 'Applied', completed: true, date: '2023-02-10' }, { name: 'Assigned', completed: true, date: '2023-02-20' }, { name: 'Inspected', completed: true, date: '2023-03-05' }, { name: 'Quoted', completed: false }, { name: 'Approved', completed: false }, { name: 'Executed', completed: false }],
        documents: [{ name: 'Application Form.pdf', url: '#', type: 'pdf' }],
        financials: { quotationAmount: 0, actualCost: 0, status: 'Pending' },
        priority: 'Medium'
    },
    {
        id: 'P003', name: 'Hydro Dam Gamma', type: 'Hydro', status: 'Applied',
        customer: 'John Doe', coordinator: 'Alice Brown', siteEngineer: null, financeTeam: null,
        startDate: '2023-04-01', endDate: '2023-11-30',
        kpis: { energyOutput: '10 MW', cost: '$3.5M' },
        activities: [{ id: 1, description: 'Application Submitted', timestamp: '2023-03-15', actor: 'John Doe' }],
        milestones: [{ name: 'Applied', completed: true, date: '2023-03-15' }, { name: 'Assigned', completed: false }, { name: 'Inspected', completed: false }, { name: 'Quoted', completed: false }, { name: 'Approved', completed: false }, { name: 'Executed', completed: false }],
        documents: [{ name: 'Application Form.pdf', url: '#', type: 'pdf' }],
        financials: { quotationAmount: 0, actualCost: 0, status: 'Pending' },
        priority: 'High'
    },
    {
        id: 'P004', name: 'Biomass Plant Delta', type: 'Biomass', status: 'Quoted',
        customer: 'Paul Grey', coordinator: 'Alice Brown', siteEngineer: 'Bob Johnson', financeTeam: 'Carol White',
        startDate: '2023-05-01', endDate: '2024-02-28',
        kpis: { energyOutput: '2 MW', cost: '$0.5M' },
        activities: [{ id: 1, description: 'Application Submitted', timestamp: '2023-04-01', actor: 'Paul Grey' }, { id: 2, description: 'Quotation Prepared', timestamp: '2023-05-10', actor: 'Carol White' }],
        milestones: [{ name: 'Applied', completed: true, date: '2023-04-01' }, { name: 'Assigned', completed: true, date: '2023-04-05' }, { name: 'Inspected', completed: true, date: '2023-04-15' }, { name: 'Quoted', completed: true, date: '2023-05-10' }, { name: 'Approved', completed: false }, { name: 'Executed', completed: false }],
        documents: [{ name: 'Application Form.pdf', url: '#', type: 'pdf' }, { name: 'Quotation.pdf', url: '#', type: 'pdf' }],
        financials: { quotationAmount: 500000, actualCost: 0, status: 'Pending Approval' },
        priority: 'Medium'
    },
    {
        id: 'P005', name: 'Solar Roof Epsilon', type: 'Solar', status: 'Assigned',
        customer: 'John Doe', coordinator: 'Alice Brown', siteEngineer: 'Eve Davis', financeTeam: null,
        startDate: '2023-06-01', endDate: '2023-08-31',
        kpis: { energyOutput: '0.1 MW', cost: '$0.05M' },
        activities: [{ id: 1, description: 'Application Submitted', timestamp: '2023-05-20', actor: 'John Doe' }, { id: 2, description: 'Site Engineer Assigned', timestamp: '2023-05-25', actor: 'Alice Brown' }],
        milestones: [{ name: 'Applied', completed: true, date: '2023-05-20' }, { name: 'Assigned', completed: true, date: '2023-05-25' }, { name: 'Inspected', completed: false }, { name: 'Quoted', completed: false }, { name: 'Approved', completed: false }, { name: 'Executed', completed: false }],
        documents: [{ name: 'Application Form.pdf', url: '#', type: 'pdf' }],
        financials: { quotationAmount: 0, actualCost: 0, status: 'Pending' },
        priority: 'Low'
    },
    {
        id: 'P006', name: 'Small Wind Farm Zeta', type: 'Wind', status: 'Executed',
        customer: 'Jane Smith', coordinator: 'Alice Brown', siteEngineer: 'Bob Johnson', financeTeam: 'Carol White',
        startDate: '2022-08-01', endDate: '2022-12-15',
        kpis: { energyOutput: '1 MW', cost: '$0.3M' },
        activities: [{ id: 1, description: 'Project Executed', timestamp: '2022-12-15', actor: 'Alice Brown' }],
        milestones: [{ name: 'Applied', completed: true, date: '2022-07-01' }, { name: 'Assigned', completed: true, date: '2022-07-10' }, { name: 'Inspected', completed: true, date: '2022-07-20' }, { name: 'Quoted', completed: true, date: '2022-08-01' }, { name: 'Approved', completed: true, date: '2022-08-10' }, { name: 'Executed', completed: true, date: '2022-12-15' }],
        documents: [{ name: 'Completion Report.pdf', url: '#', type: 'pdf' }],
        financials: { quotationAmount: 300000, actualCost: 310000, status: 'Closed' },
        priority: 'Low'
    },
    {
        id: 'P007', name: 'Community Solar Park', type: 'Solar', status: 'Rejected',
        customer: 'Paul Grey', coordinator: 'Alice Brown', siteEngineer: null, financeTeam: null,
        startDate: '2023-01-01', endDate: '2023-03-01',
        kpis: { energyOutput: '0.8 MW', cost: '$0.2M' },
        activities: [{ id: 1, description: 'Application Submitted', timestamp: '2023-01-01', actor: 'Paul Grey' }, { id: 2, description: 'Application Rejected (Site suitability)', timestamp: '2023-01-15', actor: 'Alice Brown' }],
        milestones: [{ name: 'Applied', completed: true, date: '2023-01-01' }, { name: 'Assigned', completed: false }, { name: 'Inspected', completed: false }, { name: 'Quoted', completed: false }, { name: 'Approved', completed: false }, { name: 'Rejected', completed: true, date: '2023-01-15' }],
        documents: [{ name: 'Application Form.pdf', url: '#', type: 'pdf' }],
        financials: { quotationAmount: 0, actualCost: 0, status: 'Rejected' },
        priority: 'High'
    }
];

const dummyUsers = {
    Admin: { username: 'Admin User', role: 'Admin' },
    Customer: { username: 'John Doe', role: 'Customer' },
    ProjectCoordinator: { username: 'Alice Brown', role: 'ProjectCoordinator' },
    SiteEngineer: { username: 'Bob Johnson', role: 'SiteEngineer' },
    FinanceTeam: { username: 'Carol White', role: 'FinanceTeam' },
};

// --- RBAC & Navigation Configuration ---
const rolesConfig = {
    Admin: {
        dashboard: {
            kpis: ['Total Projects', 'SLA Compliance', 'Revenue'],
            charts: [{ name: 'Project Progress Timeline', type: 'Line' }, { name: 'Energy Type Selected', type: 'Pie' }],
            activities: dummyProjects.flatMap(p => p.activities),
            widgets: ['Upcoming Deadlines', 'Task/Work Queue', 'SLA Tracker'],
        },
        views: ['Dashboard', 'Projects', 'Configuration'],
        canCreate: { 'Project': true, 'Configuration': true },
        canEdit: { 'Project': true, 'Configuration': true },
        canApprove: { 'Project': true },
    },
    Customer: {
        dashboard: {
            kpis: ['Applications Submitted', 'Approved Projects', 'In-Progress Projects'],
            charts: [], // No charts specified for customer directly in input, but 'Project Progress Timeline' can be relevant to their own projects. Sticking to input.
            activities: dummyProjects.filter(p => p.customer === 'John Doe').flatMap(p => p.activities),
            widgets: ['Upcoming Deadlines'],
        },
        views: ['Dashboard', 'My Applications'],
        canCreate: { 'ProjectApplication': true },
        canViewOwn: { 'Project': true },
    },
    ProjectCoordinator: {
        dashboard: {
            kpis: ['Active Projects', 'Pending Inspections', 'Completed Projects'],
            charts: [{ name: 'Energy Type Selected', type: 'Pie' }],
            activities: dummyProjects.filter(p => p.coordinator === 'Alice Brown').flatMap(p => p.activities),
            widgets: ['Upcoming Deadlines', 'Task/Work Queue', 'SLA Tracker'],
        },
        views: ['Dashboard', 'Projects Queue'],
        canAssign: { 'SiteEngineer': true },
        canApprove: { 'Quotation': true, 'Project': true },
    },
    SiteEngineer: {
        dashboard: {
            kpis: ['Assigned Inspections', 'Completed Inspections'],
            charts: [{ name: 'Open vs Closed Installations', type: 'Pie' }],
            activities: dummyProjects.filter(p => p.siteEngineer === 'Bob Johnson' || p.siteEngineer === 'Eve Davis').flatMap(p => p.activities),
            widgets: ['Task/Work Queue'],
        },
        views: ['Dashboard', 'My Inspections'],
        canCreate: { 'SiteInspection': true },
    },
    FinanceTeam: {
        dashboard: {
            kpis: ['Quotations Prepared', 'Approved Quotations'],
            charts: [{ name: 'Revenue Trend Over Time', type: 'Line' }],
            activities: dummyProjects.filter(p => p.financeTeam === 'Carol White' || p.financeTeam === 'Frank Green').flatMap(p => p.activities),
            widgets: ['Upcoming Deadlines'],
        },
        views: ['Dashboard', 'Quotations'],
        canCreate: { 'Quotation': true },
    },
};

const getStatusColorClass = (status) => {
    switch (status) {
        case 'Approved': case 'Completed': case 'Executed': return 'status-approved';
        case 'In Progress': case 'Assigned': return 'status-assigned';
        case 'Pending': case 'Action Required': case 'Inspected': return 'status-inspected';
        case 'Quoted': return 'status-quoted';
        case 'Rejected': case 'SLA Breach': case 'Blocked': return 'status-rejected';
        case 'Applied': case 'Exception': case 'Escalation': return 'status-applied';
        case 'Draft': return 'status-draft';
        default: return 'status-draft';
    }
};

// --- Reusable UI Components ---

const KPICard = ({ label, value, icon, trend = null, trendValue = null, className = '', onClick = () => {} }) => (
    <div className={`kpi-card ${className}`} onClick={onClick}>
        <div className="kpi-icon">{icon}</div>
        <div className="kpi-value">{value}</div>
        <div className="kpi-label">{label}</div>
        {trend && (
            <div className="kpi-footer">
                <span className={`trend ${trend === 'up' ? 'up' : 'down'}`}>
                    {trend === 'up' ? '▲' : '▼'} {trendValue}
                </span>
                <span>vs. last month</span>
            </div>
        )}
    </div>
);

const ChartComponent = ({ title, type, data, className = '' }) => (
    <div className="chart-container">
        <h3>{title}</h3>
        <div className={`chart-placeholder ${type === 'Line' ? 'line-chart' : 'pie-chart'}`}>
            {type} Chart Data Placeholder
        </div>
        {/* In a real app, this would render a charting library like Recharts or Chart.js */}
    </div>
);

const ActivityCard = ({ activity }) => (
    <div className="activity-card card">
        <div className="activity-icon">📝</div> {/* Generic icon */}
        <div className="activity-details">
            <p>{activity.description} by {activity.actor}</p>
            <span className="timestamp">{activity.timestamp}</span>
        </div>
        <div className={`status-badge ${getStatusColorClass(activity.description.includes('Submitted') ? 'Applied' : 'Info')}`}>
            {activity.description.includes('Submitted') ? 'New' : 'Update'}
        </div>
    </div>
);

const WorkQueueCard = ({ task }) => (
    <div className="work-queue-card card">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className="card-details">
            <span>Due: {task.dueDate}</span>
            <span className={`status-badge ${getStatusColorClass(task.status)}`}>{task.status}</span>
        </div>
    </div>
);

const NotificationToast = ({ message, type, visible, onDismiss }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onDismiss();
            }, 5000); // Auto-dismiss after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [visible, onDismiss]);

    if (!visible) return null;

    let icon = '';
    switch (type) {
        case 'success': icon = '✅'; break;
        case 'info': icon = 'ℹ️'; break;
        case 'warning': icon = '⚠️'; break;
        case 'error': icon = '❌'; break;
        default: icon = '💬';
    }

    return (
        <div className={`toast ${type}`}>
            <span className="toast-icon">{icon}</span>
            <span>{message}</span>
        </div>
    );
};

const ProjectCard = ({ project, onClick }) => {
    const statusClass = getStatusColorClass(project.status);
    return (
        <div className={`card colorful-card ${statusClass}`} onClick={() => onClick(project)}>
            <div className={`card-header-tint ${statusClass}`}>
                <h3>{project.name}</h3>
            </div>
            <p><strong>ID:</strong> {project.id}</p>
            <p><strong>Type:</strong> {project.type}</p>
            <p><strong>Customer:</strong> {project.customer}</p>
            <div className="card-details">
                <span>Start: {project.startDate}</span>
                <span className={`status-badge ${statusClass}`}>{project.status}</span>
            </div>
        </div>
    );
};

const WorkflowStepper = ({ milestones, currentStatus }) => {
    const statusOrder = ['Applied', 'Assigned', 'Inspected', 'Quoted', 'Approved', 'Executed', 'Rejected']; // Define order
    const currentStatusIndex = statusOrder.indexOf(currentStatus);

    return (
        <div className="workflow-tracker">
            {milestones.map((milestone, index) => {
                const isCompleted = milestone.completed;
                const isActive = milestone.name === currentStatus;
                const isPast = statusOrder.indexOf(milestone.name) < currentStatusIndex;

                return (
                    <div key={milestone.name} className={`workflow-stage ${isCompleted || isPast ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                        <div className="stage-indicator">
                            <span>{index + 1}</span>
                        </div>
                        <span className="stage-label">{milestone.name}</span>
                        {milestone.name === currentStatus && currentStatus === 'Inspected' && (
                             <span className="sla-badge" style={{ backgroundColor: 'var(--color-accent)' }}>Quote Needed</span>
                        )}
                        {milestone.name === currentStatus && currentStatus === 'Assigned' && (
                             <span className="sla-badge" style={{ backgroundColor: 'var(--color-info)' }}>Inspection Due</span>
                        )}
                         {milestone.name === 'Rejected' && isCompleted && (
                             <span className="sla-badge" style={{ backgroundColor: 'var(--color-danger)' }}>Rejected</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};


// --- Main Application Components ---

const LoginScreen = ({ onLogin }) => {
    const [selectedRole, setSelectedRole] = useState('Admin');

    const handleLogin = () => {
        onLogin(dummyUsers[selectedRole]);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Renewable Energy Platform</h2>
                <div className="form-field">
                    <label htmlFor="role-select">Select Your Role:</label>
                    <select
                        id="role-select"
                        className="input-control"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        {Object.keys(dummyUsers).map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                <button className="button button-primary" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

const Dashboard = ({ currentUser, showToast }) => {
    const config = rolesConfig[currentUser.role];

    // Filter projects relevant to the current user
    let userProjects = dummyProjects;
    if (currentUser.role === 'Customer') {
        userProjects = dummyProjects.filter(p => p.customer === currentUser.username);
    } else if (currentUser.role === 'ProjectCoordinator') {
        userProjects = dummyProjects.filter(p => p.coordinator === currentUser.username);
    } else if (currentUser.role === 'SiteEngineer') {
        userProjects = dummyProjects.filter(p => p.siteEngineer === currentUser.username);
    } else if (currentUser.role === 'FinanceTeam') {
        userProjects = dummyProjects.filter(p => p.financeTeam === currentUser.username);
    }

    const getKpiValue = (kpiName) => {
        switch (kpiName) {
            case 'Applications Submitted': return userProjects.filter(p => p.status === 'Applied').length;
            case 'Approved Projects': return userProjects.filter(p => p.status === 'Approved').length;
            case 'In-Progress Projects': return userProjects.filter(p => p.status === 'Assigned' || p.status === 'Inspected' || p.status === 'Quoted').length;
            case 'Active Projects': return userProjects.filter(p => p.status !== 'Approved' && p.status !== 'Executed' && p.status !== 'Rejected').length;
            case 'Pending Inspections': return userProjects.filter(p => p.status === 'Assigned').length;
            case 'Completed Projects': return userProjects.filter(p => p.status === 'Executed').length;
            case 'Assigned Inspections': return userProjects.filter(p => p.status === 'Assigned' && p.siteEngineer === currentUser.username).length;
            case 'Completed Inspections': return userProjects.filter(p => p.status === 'Inspected' && p.siteEngineer === currentUser.username).length;
            case 'Quotations Prepared': return userProjects.filter(p => p.status === 'Quoted' && p.financeTeam === currentUser.username).length;
            case 'Approved Quotations': return userProjects.filter(p => p.status === 'Approved' && p.financeTeam === currentUser.username).length;
            case 'Total Projects': return dummyProjects.length;
            case 'SLA Compliance': return '92%'; // Dummy value
            case 'Revenue': return '$4.5M'; // Dummy value
            default: return 0;
        }
    };

    const getKpiIcon = (kpiName) => {
        switch (kpiName) {
            case 'Applications Submitted': return '📝';
            case 'Approved Projects': return '✅';
            case 'In-Progress Projects': return '⏳';
            case 'Active Projects': return '📊';
            case 'Pending Inspections': return '🔍';
            case 'Completed Projects': return '🏆';
            case 'Assigned Inspections': return '👷';
            case 'Completed Inspections': return '✔️';
            case 'Quotations Prepared': return '💰';
            case 'Approved Quotations': return '👍';
            case 'Total Projects': return '🏗️';
            case 'SLA Compliance': return '⏰';
            case 'Revenue': return '💲';
            default: return '✨';
        }
    };

    const getKpiClassName = (kpiName) => {
        switch (kpiName) {
            case 'Applications Submitted': return 'kpi-applications';
            case 'Approved Projects': return 'kpi-approved';
            case 'In-Progress Projects': return 'kpi-in-progress';
            case 'Active Projects': return 'kpi-active';
            case 'Pending Inspections': return 'kpi-pending-inspections';
            case 'Completed Projects': return 'kpi-completed';
            case 'Assigned Inspections': return 'kpi-assigned-inspections';
            case 'Completed Inspections': return 'kpi-completed-inspections';
            case 'Quotations Prepared': return 'kpi-quotations-prepared';
            case 'Approved Quotations': return 'kpi-approved-quotations';
            case 'Total Projects': return 'kpi-total-projects';
            case 'SLA Compliance': return 'kpi-sla-compliance';
            case 'Revenue': return 'kpi-revenue';
            default: return '';
        }
    };

    const dummyTasks = [
        { id: 'T001', title: 'Review P002 Inspection Report', description: 'Action required for Wind Turbine Beta.', dueDate: '2023-06-20', status: 'Pending' },
        { id: 'T002', title: 'Prepare P003 Quotation', description: 'Financial proposal for Hydro Dam Gamma.', dueDate: '2023-06-25', status: 'In Progress' },
    ];
    const dummyUpcomingDeadlines = [
        { id: 'D001', title: 'P004 Approval Deadline', description: 'Approval for Biomass Plant Delta quotation.', dueDate: '2023-06-18', status: 'SLA Breach' },
        { id: 'D002', title: 'P005 Site Inspection', description: 'Schedule inspection for Solar Roof Epsilon.', dueDate: '2023-06-22', status: 'Pending' },
    ];


    return (
        <div>
            <div className="dashboard-section">
                <h2>Key Performance Indicators</h2>
                <div className="dashboard-grid">
                    {config.dashboard.kpis.map(kpi => (
                        <KPICard
                            key={kpi}
                            label={kpi}
                            value={getKpiValue(kpi)}
                            icon={getKpiIcon(kpi)}
                            className={getKpiClassName(kpi)}
                            trend={Math.random() > 0.5 ? 'up' : 'down'}
                            trendValue={`${(Math.random() * 10).toFixed(1)}%`}
                            onClick={() => showToast(`Drill-down for ${kpi}`, 'info')}
                        />
                    ))}
                </div>
            </div>

            {config.dashboard.charts && config.dashboard.charts.length > 0 && (
                <div className="dashboard-section">
                    <h2>Analytics & Visualizations</h2>
                    <div className="dashboard-grid">
                        {config.dashboard.charts.map(chart => (
                            <ChartComponent
                                key={chart.name}
                                title={chart.name}
                                type={chart.type}
                                data={[]} // Dummy data
                            />
                        ))}
                    </div>
                </div>
            )}

            {config.dashboard.activities && config.dashboard.activities.length > 0 && (
                <div className="dashboard-section">
                    <h2>Recent Activities</h2>
                    <div className="card-grid">
                        {config.dashboard.activities.slice(0, 5).map(activity => (
                            <ActivityCard key={activity.id} activity={activity} />
                        ))}
                    </div>
                </div>
            )}

            {config.dashboard.widgets && (
                <div className="dashboard-section">
                    <h2>Widgets</h2>
                    <div className="dashboard-grid">
                        {config.dashboard.widgets.includes('Task/Work Queue') && (
                            <div className="card">
                                <h3>Task / Work Queue</h3>
                                {dummyTasks.map(task => <WorkQueueCard key={task.id} task={task} />)}
                            </div>
                        )}
                        {config.dashboard.widgets.includes('Upcoming Deadlines') && (
                            <div className="card">
                                <h3>Upcoming Deadlines</h3>
                                {dummyUpcomingDeadlines.map(deadline => (
                                    <div key={deadline.id} className="activity-card" style={{borderBottom: 'none'}}>
                                        <div className="activity-icon">🗓️</div>
                                        <div className="activity-details">
                                            <p><strong>{deadline.title}</strong></p>
                                            <span className="timestamp">{deadline.dueDate} - {deadline.description}</span>
                                        </div>
                                        <span className={`status-badge ${getStatusColorClass(deadline.status)}`}>{deadline.status}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {config.dashboard.widgets.includes('SLA Tracker') && (
                            <div className="card">
                                <h3>SLA Tracker</h3>
                                <p>Project P004 (Biomass Plant Delta) is <strong>1 day past SLA</strong> for approval.</p>
                                <p>Project P005 (Solar Roof Epsilon) inspection due in <strong>3 days</strong>.</p>
                                <span className="status-badge status-sla-breach">🚨 SLA Alert</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const ProjectsList = ({ currentUser, onViewDetail, showToast, filter = {}, search = '' }) => {
    let filteredProjects = dummyProjects.filter(project => {
        // Role-based record visibility
        if (currentUser.role === 'Customer' && project.customer !== currentUser.username) return false;
        if (currentUser.role === 'ProjectCoordinator' && project.coordinator !== currentUser.username) return false; // Coordinator only sees assigned projects
        if (currentUser.role === 'SiteEngineer' && project.siteEngineer !== currentUser.username) return false; // Site Engineer only sees assigned projects
        if (currentUser.role === 'FinanceTeam' && project.financeTeam !== currentUser.username) return false; // Finance Team only sees assigned projects

        // Dashboard-level filters
        if (filter.status && project.status !== filter.status) return false;
        if (filter.energyType && project.type !== filter.energyType) return false;
        if (filter.date && new Date(project.startDate) < new Date(filter.date)) return false;

        // Search functionality
        if (search && !(
            project.id.toLowerCase().includes(search.toLowerCase()) ||
            project.name.toLowerCase().includes(search.toLowerCase()) ||
            project.type.toLowerCase().includes(search.toLowerCase()) ||
            project.customer.toLowerCase().includes(search.toLowerCase()) ||
            project.status.toLowerCase().includes(search.toLowerCase())
        )) {
            return false;
        }

        return true;
    });

    if (filteredProjects.length === 0) {
        return (
            <div className="text-center" style={{padding: 'var(--spacing-xl)', backgroundColor: 'var(--color-surface-light)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)'}}>
                <h2>No Projects Found</h2>
                <p>It looks like there are no projects matching your criteria.</p>
                {currentUser.role === 'Customer' && (
                    <button className="button button-primary margin-top-lg" onClick={() => showToast('Open Project Application Form', 'info')}>
                        <Icon name="➕" /> Start a New Application
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="card-grid">
            {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} onClick={onViewDetail} />
            ))}
        </div>
    );
};

const RecordDetail = ({ record, onBack, currentUser, showToast, onActionSuccess }) => {
    if (!record) return null;

    const [showFabMenu, setShowFabMenu] = useState(false);
    const config = rolesConfig[currentUser.role];

    const handleAction = (actionName) => {
        showToast(`${actionName} action for ${record.id} triggered.`, 'info');
        setShowFabMenu(false);

        // Simulate status update for workflow progression
        let newStatus = record.status;
        let milestoneCompleted = null;
        if (actionName === 'Assign' && record.status === 'Applied' && config.canAssign) {
            newStatus = 'Assigned';
            milestoneCompleted = 'Assigned';
        } else if (actionName === 'Approve' && record.status === 'Quoted' && config.canApprove) {
            newStatus = 'Approved';
            milestoneCompleted = 'Approved';
        } else if (actionName === 'Reject' && record.status !== 'Rejected' && config.canApprove) {
            newStatus = 'Rejected';
            milestoneCompleted = 'Rejected';
        } else if (actionName === 'Complete Inspection' && record.status === 'Assigned' && currentUser.role === 'SiteEngineer') {
            newStatus = 'Inspected';
            milestoneCompleted = 'Inspected';
        } else if (actionName === 'Prepare Quotation' && record.status === 'Inspected' && currentUser.role === 'FinanceTeam') {
            newStatus = 'Quoted';
            milestoneCompleted = 'Quoted';
        } else if (actionName === 'Execute Project' && record.status === 'Approved' && currentUser.role === 'ProjectCoordinator') {
            newStatus = 'Executed';
            milestoneCompleted = 'Executed';
        }

        if (milestoneCompleted) {
            onActionSuccess(record.id, newStatus, milestoneCompleted);
            showToast(`Project ${record.id} status updated to ${newStatus}!`, 'success');
        } else {
             showToast(`Action "${actionName}" not applicable or permitted for current status/role.`, 'warning');
        }
    };

    const isActionAllowed = (action) => {
        if (currentUser.role === 'Admin') return true;

        if (action === 'Assign' && currentUser.role === 'ProjectCoordinator' && record.status === 'Applied') return true;
        if (action === 'Approve' && currentUser.role === 'ProjectCoordinator' && record.status === 'Quoted') return true;
        if (action === 'Reject' && currentUser.role === 'ProjectCoordinator' && record.status !== 'Rejected' && record.status !== 'Executed') return true;
        if (action === 'Comment') return true;
        if (action === 'Complete Inspection' && currentUser.role === 'SiteEngineer' && record.siteEngineer === currentUser.username && record.status === 'Assigned') return true;
        if (action === 'Prepare Quotation' && currentUser.role === 'FinanceTeam' && record.financeTeam === currentUser.username && record.status === 'Inspected') return true;
        if (action === 'Execute Project' && currentUser.role === 'ProjectCoordinator' && record.status === 'Approved') return true;

        return false;
    };


    return (
        <div>
            <div className="page-header">
                <h1>Project {record.name} Details</h1>
                <button className="button button-secondary" onClick={onBack}>
                    <Icon name="◀️" /> Back to Projects
                </button>
            </div>

            <div className="record-detail-container">
                <div className="detail-section">
                    <h3>Workflow Progress</h3>
                    <WorkflowStepper milestones={record.milestones} currentStatus={record.status} />
                </div>

                <div className="detail-sections">
                    <div className="detail-section">
                        <h3>Overview</h3>
                        <div className="detail-item"><label>ID:</label><span>{record.id}</span></div>
                        <div className="detail-item"><label>Name:</label><span>{record.name}</span></div>
                        <div className="detail-item"><label>Type:</label><span>{record.type}</span></div>
                        <div className="detail-item"><label>Status:</label><span className={`status-badge ${getStatusColorClass(record.status)}`}>{record.status}</span></div>
                        <div className="detail-item"><label>Customer:</label><span>{record.customer}</span></div>
                        <div className="detail-item"><label>Coordinator:</label><span>{record.coordinator || 'N/A'}</span></div>
                        <div className="detail-item"><label>Site Engineer:</label><span>{record.siteEngineer || 'N/A'}</span></div>
                        <div className="detail-item"><label>Finance Team:</label><span>{record.financeTeam || 'N/A'}</span></div>
                        <div className="detail-item"><label>Start Date:</label><span>{record.startDate}</span></div>
                        <div className="detail-item"><label>End Date:</label><span>{record.endDate}</span></div>
                    </div>

                    <div className="detail-section">
                        <h3>Financials</h3>
                        <div className="detail-item"><label>Quotation Amount:</label><span>{record.financials.quotationAmount > 0 ? `$${record.financials.quotationAmount.toLocaleString()}` : 'Pending'}</span></div>
                        <div className="detail-item"><label>Actual Cost:</label><span>{record.financials.actualCost > 0 ? `$${record.financials.actualCost.toLocaleString()}` : 'N/A'}</span></div>
                        <div className="detail-item"><label>Financial Status:</label><span className={`status-badge ${getStatusColorClass(record.financials.status)}`}>{record.financials.status}</span></div>
                    </div>

                    <div className="detail-section">
                        <h3>Documents</h3>
                        {record.documents.length > 0 ? (
                            record.documents.map((doc, index) => (
                                <div key={index} className="detail-item">
                                    <label>📄</label>
                                    <span><a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.name}</a></span>
                                </div>
                            ))
                        ) : (
                            <p>No documents available.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="detail-actions-fab" onClick={() => setShowFabMenu(!showFabMenu)}>
                <Icon name="⚙️" />
                {showFabMenu && (
                    <div className="fab-menu">
                        {isActionAllowed('Assign') && <button onClick={() => handleAction('Assign')}><Icon name="🧑‍💻" /> Assign Site Engineer</button>}
                        {isActionAllowed('Complete Inspection') && <button onClick={() => handleAction('Complete Inspection')}><Icon name="✅" /> Complete Inspection</button>}
                        {isActionAllowed('Prepare Quotation') && <button onClick={() => handleAction('Prepare Quotation')}><Icon name="📝" /> Prepare Quotation</button>}
                        {isActionAllowed('Approve') && <button onClick={() => handleAction('Approve')}><Icon name="👍" /> Approve</button>}
                        {isActionAllowed('Reject') && <button onClick={() => handleAction('Reject')}><Icon name="👎" /> Reject</button>}
                        {isActionAllowed('Execute Project') && <button onClick={() => handleAction('Execute Project')}><Icon name="🚀" /> Execute Project</button>}
                        {isActionAllowed('Comment') && <button onClick={() => handleAction('Comment')}><Icon name="💬" /> Add Comment</button>}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Forms ---
const ProjectApplicationForm = ({ currentUser, onSubmissionSuccess, onBack }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        projectName: '', energyType: 'Solar', customerName: currentUser.username,
        location: '', estimatedBudget: '', description: '',
        attachments: [],
    });
    const [submitted, setSubmitted] = useState(false);

    const totalSteps = 3;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, attachments: [...formData.attachments, ...Array.from(e.target.files)] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (currentStep === 1 && (!formData.projectName || !formData.energyType)) {
            alert('Please fill in project name and energy type.');
            return;
        }
        if (currentStep === totalSteps) {
            console.log('Form Submitted:', formData);
            setSubmitted(true);
            onSubmissionSuccess();
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    if (submitted) {
        return (
            <div className="success-screen">
                <span className="icon-large">🎉</span>
                <h2>Application Submitted Successfully!</h2>
                <p>Your renewable energy project application has been received. We will get back to you shortly.</p>
                <button className="button button-primary" onClick={onBack}>
                    <Icon name="🏠" /> Go to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="form-container">
            <div className="page-header">
                <h1>Project Application</h1>
                <button className="button button-secondary" onClick={onBack}>
                    <Icon name="◀️" /> Back
                </button>
            </div>
            <div className="form-progress-bar">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
                    <div key={step} className={`progress-step ${step < currentStep ? 'completed' : ''} ${step === currentStep ? 'active' : ''}`}>
                        <div className="progress-step-indicator"><span>{step}</span></div>
                        <span className="progress-step-label">Step {step}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                    <div className="form-section">
                        <h3>Project Details</h3>
                        <div className="form-field">
                            <label htmlFor="projectName">Project Name <span style={{color: 'red'}}>*</span></label>
                            <input type="text" id="projectName" name="projectName" className="input-control" value={formData.projectName} onChange={handleChange} required />
                        </div>
                        <div className="form-field">
                            <label htmlFor="energyType">Energy Type <span style={{color: 'red'}}>*</span></label>
                            <select id="energyType" name="energyType" className="input-control" value={formData.energyType} onChange={handleChange} required>
                                <option value="Solar">Solar</option>
                                <option value="Wind">Wind</option>
                                <option value="Hydro">Hydro</option>
                                <option value="Biomass">Biomass</option>
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor="customerName">Customer Name</label>
                            <input type="text" id="customerName" name="customerName" className="input-control" value={formData.customerName} disabled />
                        </div>
                        <div className="form-field">
                            <label htmlFor="description">Project Description</label>
                            <textarea id="description" name="description" className="input-control" value={formData.description} onChange={handleChange} rows="4"></textarea>
                        </div>
                    </div>
                )}
                {currentStep === 2 && (
                    <div className="form-section">
                        <h3>Location & Budget</h3>
                        <div className="form-field">
                            <label htmlFor="location">Project Location</label>
                            <input type="text" id="location" name="location" className="input-control" value={formData.location} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <label htmlFor="estimatedBudget">Estimated Budget ($)</label>
                            <input type="number" id="estimatedBudget" name="estimatedBudget" className="input-control" value={formData.estimatedBudget} onChange={handleChange} />
                        </div>
                    </div>
                )}
                {currentStep === 3 && (
                    <div className="form-section">
                        <h3>Attachments</h3>
                        <div className="form-field">
                            <label>Supporting Documents</label>
                            <div className="file-upload-container">
                                <input type="file" multiple onChange={handleFileChange} />
                                <p>Drag & drop files here, or click to browse</p>
                            </div>
                            {formData.attachments.map((file, index) => (
                                <div key={index} className="uploaded-file">
                                    <span>📄 {file.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="form-actions">
                    {currentStep > 1 && (
                        <button type="button" className="button button-secondary" onClick={() => setCurrentStep(currentStep - 1)}>
                            <Icon name="◀️" /> Previous
                        </button>
                    )}
                    <button type="submit" className="button button-primary">
                        {currentStep < totalSteps ? 'Next' : 'Submit Application'} <Icon name="▶️" />
                    </button>
                </div>
            </form>
        </div>
    );
};

// SiteInspectionForm, QuotationForm, ConfigurationForm would follow a similar step-based structure
// For brevity in this example, only ProjectApplicationForm is fully detailed.
const SiteInspectionForm = ({ onSubmissionSuccess, onBack, projectId }) => (
    <div className="form-container">
        <div className="page-header">
            <h1>Site Inspection for {projectId || 'Project PXXX'}</h1>
            <button className="button button-secondary" onClick={onBack}>
                <Icon name="◀️" /> Back
            </button>
        </div>
        <div className="form-progress-bar">
            {/* Steps for inspection */}
            <div className="progress-step active"><div className="progress-step-indicator"><span>1</span></div><span className="progress-step-label">Site Details</span></div>
            <div className="progress-step"><div className="progress-step-indicator"><span>2</span></div><span className="progress-step-label">Findings</span></div>
            <div className="progress-step"><div className="progress-step-indicator"><span>3</span></div><span className="progress-step-label">Recommendations</span></div>
        </div>
        <div className="form-section">
            <h3>Site Details</h3>
            <div className="form-field"><label>Site Address</label><input type="text" className="input-control" value="123 Renewable St, Green City" disabled /></div>
            <div className="form-field"><label>Inspection Date</label><input type="date" className="input-control" value="2023-06-15" onChange={() => {}} /></div>
            <div className="form-field"><label>Site Condition</label><select className="input-control"><option>Excellent</option><option>Good</option><option>Moderate</option><option>Poor</option></select></div>
        </div>
        <div className="form-actions">
            <button className="button button-primary" onClick={() => onSubmissionSuccess()}>
                Save & Next <Icon name="▶️" />
            </button>
        </div>
    </div>
);

const QuotationForm = ({ onSubmissionSuccess, onBack, projectId }) => (
     <div className="form-container">
        <div className="page-header">
            <h1>Generate Quotation for {projectId || 'Project PXXX'}</h1>
            <button className="button button-secondary" onClick={onBack}>
                <Icon name="◀️" /> Back
            </button>
        </div>
        <div className="form-progress-bar">
            {/* Steps for quotation */}
            <div className="progress-step active"><div className="progress-step-indicator"><span>1</span></div><span className="progress-step-label">Cost Breakdown</span></div>
            <div className="progress-step"><div className="progress-step-indicator"><span>2</span></div><span className="progress-step-label">Terms</span></div>
            <div className="progress-step"><div className="progress-step-indicator"><span>3</span></div><span className="progress-step-label">Review</span></div>
        </div>
        <div className="form-section">
            <h3>Cost Breakdown</h3>
            <div className="form-field"><label>System Cost</label><input type="number" className="input-control" value="120000" onChange={() => {}} /></div>
            <div className="form-field"><label>Installation Fee</label><input type="number" className="input-control" value="30000" onChange={() => {}} /></div>
            <div className="form-field"><label>Maintenance Plan (Annual)</label><input type="number" className="input-control" value="5000" onChange={() => {}} /></div>
            <div className="form-field"><label>Total Quotation Amount</label><input type="number" className="input-control" value="155000" disabled /></div>
        </div>
        <div className="form-actions">
            <button className="button button-primary" onClick={() => onSubmissionSuccess()}>
                Generate & Send <Icon name="▶️" />
            </button>
        </div>
    </div>
);

const ConfigurationForm = ({ onSubmissionSuccess, onBack }) => (
    <div className="form-container">
        <div className="page-header">
            <h1>System Configuration</h1>
            <button className="button button-secondary" onClick={onBack}>
                <Icon name="◀️" /> Back
            </button>
        </div>
         <div className="form-progress-bar">
            {/* Steps for configuration */}
            <div className="progress-step active"><div className="progress-step-indicator"><span>1</span></div><span className="progress-step-label">Users</span></div>
            <div className="progress-step"><div className="progress-step-indicator"><span>2</span></div><span className="progress-step-label">Roles</span></div>
            <div className="progress-step"><div className="progress-step-indicator"><span>3</span></div><span className="progress-step-label">Workflows</span></div>
        </div>
        <div className="form-section">
            <h3>User Management</h3>
            <div className="form-field"><label>Add New User</label><input type="text" className="input-control" placeholder="New Username" /></div>
            <div className="form-field"><label>Assign Role</label><select className="input-control">
                <option>Customer</option><option>Project Coordinator</option><option>Site Engineer</option><option>Finance Team</option>
            </select></div>
            <button className="button button-primary" onClick={() => onSubmissionSuccess()}>Save User</button>
        </div>
        <div className="form-actions">
            <button className="button button-primary" onClick={() => onSubmissionSuccess()}>Save All</button>
        </div>
    </div>
);


// --- Main App Component ---
function App() {
    const [currentUser, setCurrentUser] = useState(null); // Initially null, shows login screen
    const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'projects', 'detail', 'form'
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [formType, setFormType] = useState(null); // 'ProjectApplication', 'SiteInspection', 'Quotation', 'Configuration'
    const [toast, setToast] = useState({ message: '', type: 'info', visible: false });
    const [projectsData, setProjectsData] = useState(dummyProjects); // State for projects to allow updates

    const showToast = (message, type = 'info') => {
        setToast({ message, type, visible: true });
    };

    const dismissToast = () => {
        setToast(prev => ({ ...prev, visible: false }));
    };

    const handleLogin = (user) => {
        setCurrentUser(user);
        setCurrentView('dashboard');
        showToast(`Welcome, ${user.username}! You are logged in as ${user.role}.`, 'success');
    };

    const handleNavigation = (view) => {
        setCurrentView(view);
        setSelectedRecord(null);
        setFormType(null);
    };

    const handleViewDetail = (record) => {
        setSelectedRecord(record);
        setCurrentView('detail');
    };

    const handleBackFromDetail = () => {
        setSelectedRecord(null);
        setCurrentView('projects'); // Or relevant list view
    };

    const handleOpenForm = (type, record = null) => {
        setFormType(type);
        setSelectedRecord(record); // Pass record if editing/acting on existing
        setCurrentView('form');
    };

    const handleFormSubmissionSuccess = () => {
        showToast('Operation completed successfully!', 'success');
        // Logic to update data if needed (e.g., adding a new project or updating status)
        // For prototype, we simply go back to dashboard/list view.
        setFormType(null);
        setSelectedRecord(null);
        setCurrentView('dashboard'); // Or relevant list view
    };

    const handleProjectActionSuccess = (projectId, newStatus, milestoneName) => {
        setProjectsData(prevProjects => {
            const updatedProjects = prevProjects.map(project => {
                if (project.id === projectId) {
                    const updatedMilestones = project.milestones.map(milestone =>
                        milestone.name === milestoneName ? { ...milestone, completed: true, date: new Date().toISOString().slice(0, 10) } : milestone
                    );
                    return { ...project, status: newStatus, milestones: updatedMilestones };
                }
                return project;
            });
            // Update selected record in full-screen view as well
            if (selectedRecord && selectedRecord.id === projectId) {
                const updatedSelected = updatedProjects.find(p => p.id === projectId);
                setSelectedRecord(updatedSelected);
            }
            return updatedProjects;
        });
        showToast(`Project ${projectId} updated to ${newStatus}!`, 'success');
    };


    if (!currentUser) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    const appClassName = `app-container ${currentView === 'detail' || currentView === 'form' ? 'full-screen-mode' : ''}`;

    const renderMainContent = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard currentUser={currentUser} showToast={showToast} />;
            case 'projects': // Generic projects list for Admin
                return (
                    <>
                        <div className="page-header">
                            <h1>All Projects</h1>
                            {currentUser.role === 'Admin' && (
                                <button className="button button-primary" onClick={() => handleOpenForm('Project')}>
                                    <Icon name="➕" /> New Project
                                </button>
                            )}
                        </div>
                        <ProjectsList currentUser={currentUser} onViewDetail={handleViewDetail} showToast={showToast} />
                    </>
                );
            case 'myApplications': // Customer's specific view
                return (
                    <>
                        <div className="page-header">
                            <h1>My Applications</h1>
                            {currentUser.role === 'Customer' && (
                                <button className="button button-primary" onClick={() => handleOpenForm('ProjectApplication')}>
                                    <Icon name="➕" /> New Application
                                </button>
                            )}
                        </div>
                        <ProjectsList
                            currentUser={currentUser}
                            onViewDetail={handleViewDetail}
                            showToast={showToast}
                            filter={{ customer: currentUser.username }} // Filter by current customer
                        />
                    </>
                );
            case 'projectsQueue': // Project Coordinator's view
                return (
                    <>
                        <div className="page-header">
                            <h1>Projects Queue</h1>
                        </div>
                        <ProjectsList
                            currentUser={currentUser}
                            onViewDetail={handleViewDetail}
                            showToast={showToast}
                            filter={{ coordinator: currentUser.username }} // Filter by current coordinator
                        />
                    </>
                );
            case 'myInspections': // Site Engineer's view
                return (
                    <>
                        <div className="page-header">
                            <h1>My Inspections</h1>
                        </div>
                        <ProjectsList
                            currentUser={currentUser}
                            onViewDetail={handleViewDetail}
                            showToast={showToast}
                            filter={{ siteEngineer: currentUser.username }} // Filter by current site engineer
                        />
                    </>
                );
            case 'quotations': // Finance Team's view
                return (
                    <>
                        <div className="page-header">
                            <h1>Quotations</h1>
                        </div>
                        <ProjectsList
                            currentUser={currentUser}
                            onViewDetail={handleViewDetail}
                            showToast={showToast}
                            filter={{ financeTeam: currentUser.username, status: 'Quoted' }} // Filter by finance team and 'Quoted' status
                        />
                    </>
                );
            case 'detail':
                return <RecordDetail record={selectedRecord} onBack={handleBackFromDetail} currentUser={currentUser} showToast={showToast} onActionSuccess={handleProjectActionSuccess} />;
            case 'form':
                if (formType === 'ProjectApplication') {
                    return <ProjectApplicationForm currentUser={currentUser} onSubmissionSuccess={handleFormSubmissionSuccess} onBack={handleBackFromDetail} />;
                } else if (formType === 'SiteInspection') {
                    return <SiteInspectionForm onSubmissionSuccess={handleFormSubmissionSuccess} onBack={handleBackFromDetail} projectId={selectedRecord?.id} />;
                } else if (formType === 'Quotation') {
                    return <QuotationForm onSubmissionSuccess={handleFormSubmissionSuccess} onBack={handleBackFromDetail} projectId={selectedRecord?.id} />;
                } else if (formType === 'Configuration') {
                    return <ConfigurationForm onSubmissionSuccess={handleFormSubmissionSuccess} onBack={handleBackFromDetail} />;
                }
                return <div>Form Not Found</div>; // Fallback
            case 'configuration':
                 return <ConfigurationForm onSubmissionSuccess={handleFormSubmissionSuccess} onBack={() => handleNavigation('dashboard')} />;
            default:
                return <div>Select a view from the sidebar.</div>;
        }
    };

    const getSidebarItems = (role) => {
        const items = [
            { id: 'dashboard', label: 'Dashboard', icon: '🏠', roles: ['Admin', 'Customer', 'ProjectCoordinator', 'SiteEngineer', 'FinanceTeam'] },
        ];

        if (role === 'Admin') {
            items.push({ id: 'projects', label: 'All Projects', icon: '🏗️', roles: ['Admin'] });
            items.push({ id: 'configuration', label: 'Configuration', icon: '⚙️', roles: ['Admin'] });
        } else if (role === 'Customer') {
            items.push({ id: 'myApplications', label: 'My Applications', icon: '📝', roles: ['Customer'] });
        } else if (role === 'ProjectCoordinator') {
            items.push({ id: 'projectsQueue', label: 'Projects Queue', icon: '⏳', roles: ['ProjectCoordinator'] });
        } else if (role === 'SiteEngineer') {
            items.push({ id: 'myInspections', label: 'My Inspections', icon: '🔍', roles: ['SiteEngineer'] });
        } else if (role === 'FinanceTeam') {
            items.push({ id: 'quotations', label: 'Quotations', icon: '💰', roles: ['FinanceTeam'] });
        }
        return items;
    };

    return (
        <div className={appClassName}>
            <header className="app-header">
                <div className="logo">RenewableX</div>
                <div className="user-info">
                    <span>{currentUser.username}</span>
                    <Icon name="👤" />
                    <button className="button button-secondary" onClick={() => setCurrentUser(null)} style={{marginLeft: '10px'}}>
                        Logout
                    </button>
                </div>
            </header>
            <aside className="app-sidebar">
                {getSidebarItems(currentUser.role).map(item => (
                    item.roles.includes(currentUser.role) && (
                        <a
                            key={item.id}
                            className={`sidebar-item ${currentView === item.id ? 'active' : ''}`}
                            onClick={() => handleNavigation(item.id)}
                        >
                            <Icon name={item.icon} /> {item.label}
                        </a>
                    )
                ))}
            </aside>
            <main className="app-main">
                {renderMainContent()}
            </main>
            <div className="toast-container">
                <NotificationToast {...toast} onDismiss={dismissToast} />
            </div>
        </div>
    );
}

export default App;