import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| SETTINGS ||============================== //

export default function Settings() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Stack sx={{ gap: 3, maxWidth: 720 }}>
      {/* page header */}
      <Stack sx={{ gap: 1 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" underline="hover" color="text.secondary" variant="body2">
            Home
          </Link>
          <Typography variant="body2" color="text.primary">
            Settings
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3">Settings</Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account details and how others see you.
        </Typography>
      </Stack>

      {/* account details form */}
      <MainCard title="Account details">
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="settings-name">Full name</InputLabel>
                <OutlinedInput id="settings-name" name="name" fullWidth placeholder="Enter your full name" defaultValue="Jane Cooper" />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="settings-email">Email address</InputLabel>
                <OutlinedInput
                  id="settings-email"
                  name="email"
                  type="email"
                  fullWidth
                  placeholder="Enter email address"
                  defaultValue="jane@acme.com"
                />
                <FormHelperText>We&apos;ll send billing and security notices here.</FormHelperText>
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="settings-company">Company</InputLabel>
                <OutlinedInput id="settings-company" name="company" fullWidth placeholder="Enter company name" defaultValue="Acme Inc." />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack direction="row" sx={{ gap: 1.5, justifyContent: 'flex-end' }}>
                <Button type="reset" variant="outlined" color="secondary">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save changes
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </MainCard>

      {/* danger zone */}
      <MainCard title="Danger zone" sx={{ borderColor: 'error.main' }}>
        <Stack direction="row" sx={{ gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="subtitle1">Delete account</Typography>
            <Typography variant="body2" color="text.secondary">
              Permanently remove your account and all of its data. This action cannot be undone.
            </Typography>
          </Stack>
          <Button variant="contained" color="error" sx={{ flexShrink: 0 }}>
            Delete account
          </Button>
        </Stack>
      </MainCard>
    </Stack>
  );
}
