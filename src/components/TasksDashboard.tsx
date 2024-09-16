import { Grid, Tabs, Tab, Box, Button, Typography } from '@mui/material';
import useGetTasks from '../hooks/useGetTasks';
import { useState, SyntheticEvent } from 'react';
import TasksTableV2 from './TasksTableV2';
import AddTask from './AddTask';

export default function TasksDashboard() {
  const [value, setValue] = useState(0);
  const [addTask, setAddTask] = useState(false);

  const { isPending, isError, data, error } = useGetTasks();

  if (isPending) {
    return <span>Loading tasks...</span>;
  }

  if (isError) {
    return <span>Error loading tasks: {error.message}</span>;
  }

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleAddTask = () => {
    setAddTask(!addTask);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography gutterBottom variant="h4">
        James's Super Duper RTL Workshop
      </Typography>
      <Tabs value={value} onChange={handleChange}>
        <Tab
          label="All tasks"
          sx={{
            '&:focus': { outline: 'none' },
          }}
        />
        <Tab
          label="Today"
          sx={{
            '&:focus': { outline: 'none' },
          }}
        />
        <Tab
          label="Upcoming"
          sx={{
            '&:focus': { outline: 'none' },
          }}
        />
        <Tab
          label="Archive"
          sx={{
            '&:focus': { outline: 'none' },
          }}
        />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <TasksTableV2 data={data} />
      </CustomTabPanel>
      {addTask ? (
        <AddTask toggleAddTask={toggleAddTask} />
      ) : (
        <Button onClick={() => setAddTask(true)}>Add task</Button>
      )}
    </Grid>
  );
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
