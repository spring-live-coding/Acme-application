import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import UsergroupAddOutlined from '@ant-design/icons/UsergroupAddOutlined';
import RocketOutlined from '@ant-design/icons/RocketOutlined';

const DEFAULT_PROJECT_NAME = 'Acme Launch Plan';

const choices = [
  {
    id: 'invite',
    icon: UsergroupAddOutlined,
    title: 'Invite a teammate',
    description: 'Bring someone in now'
  },
  {
    id: 'alone',
    icon: RocketOutlined,
    title: 'Continue alone',
    description: 'Set up yourself, invite later'
  }
];

function initials(email) {
  const name = email.split('@')[0] || '?';
  return name.slice(0, 2).toUpperCase();
}

// ==============================|| PROJECT SETUP - INVITE WHEN READY ||============================== //

export default function ProjectSetup() {
  const [step, setStep] = useState('project');
  const [projectNameInput, setProjectNameInput] = useState(DEFAULT_PROJECT_NAME);
  const [projectName, setProjectName] = useState(DEFAULT_PROJECT_NAME);
  const [inviteEmail, setInviteEmail] = useState('');
  const [teammates, setTeammates] = useState([]);
  const [inviteStatus, setInviteStatus] = useState(null);
  const [aloneStatus, setAloneStatus] = useState(null);

  const handleCreateProject = () => {
    setProjectName(projectNameInput.trim() || 'Untitled project');
    setStep('choice');
  };

  // simulated only — no invitation is actually sent
  const handleSendInvite = () => {
    const email = inviteEmail.trim();
    if (!email) {
      setInviteStatus({ error: true, message: 'Enter an email to invite.' });
      return;
    }

    setInviteStatus({ error: false, message: `Invite sent to ${email} — pending acceptance (simulated).` });
    setTeammates((prev) => [...prev, { email, initials: initials(email) }]);
    setInviteEmail('');
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
      {step === 'project' && (
        <MainCard>
          <Stack sx={{ gap: 0.5, mb: 3 }}>
            <Typography variant="h5">Create your first project</Typography>
            <Typography variant="body2" color="text.secondary">
              Step 1 of 1
            </Typography>
          </Stack>
          <Stack sx={{ gap: 1, mb: 3 }}>
            <InputLabel htmlFor="project-name">Project name</InputLabel>
            <OutlinedInput
              id="project-name"
              fullWidth
              value={projectNameInput}
              onChange={(event) => setProjectNameInput(event.target.value)}
              placeholder="Acme Launch Plan"
            />
          </Stack>
          <AnimateButton>
            <Button fullWidth size="large" variant="contained" color="primary" onClick={handleCreateProject}>
              Create project
            </Button>
          </AnimateButton>
        </MainCard>
      )}

      {step === 'choice' && (
        <MainCard>
          <Stack sx={{ gap: 0.5, mb: 3 }}>
            <Typography variant="h5">&quot;{projectName}&quot; is live</Typography>
            <Typography variant="body2" color="text.secondary">
              Your project is ready — how would you like to proceed?
            </Typography>
          </Stack>
          <Grid container spacing={2}>
            {choices.map((choice) => {
              const ChoiceIcon = choice.icon;

              return (
                <Grid key={choice.id} size={{ xs: 12, sm: 6 }}>
                  <MainCard
                    role="button"
                    tabIndex={0}
                    onClick={() => setStep(choice.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setStep(choice.id);
                      }
                    }}
                    contentSX={{ p: 2.5, textAlign: 'center', '&:last-child': { pb: 2.5 } }}
                    sx={(theme) => ({
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'border-color 150ms ease, box-shadow 150ms ease',
                      ':hover': { borderColor: 'primary.main', boxShadow: theme.customShadows.z1 },
                      ':focus-visible': { outline: 'none', borderColor: 'primary.main', boxShadow: theme.customShadows.z1 }
                    })}
                  >
                    <Stack sx={{ gap: 1, alignItems: 'center' }}>
                      <Avatar type="combined" color="primary" size="sm">
                        <ChoiceIcon />
                      </Avatar>
                      <Stack sx={{ gap: 0.25 }}>
                        <Typography variant="subtitle1">{choice.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {choice.description}
                        </Typography>
                      </Stack>
                    </Stack>
                  </MainCard>
                </Grid>
              );
            })}
          </Grid>
        </MainCard>
      )}

      {step === 'invite' && (
        <MainCard>
          <Stack sx={{ gap: 0.5, mb: 3 }}>
            <Typography variant="h5">Invite a teammate</Typography>
            <Typography variant="body2" color="text.secondary">
              They&apos;ll get access to &quot;{projectName}&quot;
            </Typography>
          </Stack>
          <Stack sx={{ gap: 1, mb: 3 }}>
            <InputLabel htmlFor="invite-email">Teammate email</InputLabel>
            <OutlinedInput
              id="invite-email"
              fullWidth
              type="email"
              value={inviteEmail}
              onChange={(event) => setInviteEmail(event.target.value)}
              placeholder="teammate@example.com"
              error={Boolean(inviteStatus?.error)}
            />
          </Stack>
          <Stack direction="row" sx={{ gap: 1.5, '& > *': { flex: 1 } }}>
            <Button fullWidth size="large" variant="outlined" color="secondary" onClick={() => setStep('choice')}>
              Back
            </Button>
            <AnimateButton>
              <Button fullWidth size="large" variant="contained" color="primary" onClick={handleSendInvite}>
                Send invite
              </Button>
            </AnimateButton>
          </Stack>
          {inviteStatus && (
            <Typography variant="body2" color={inviteStatus.error ? 'error.main' : 'success.main'} sx={{ mt: 2 }}>
              {inviteStatus.message}
            </Typography>
          )}
          {teammates.length > 0 && (
            <Stack sx={{ mt: 2 }}>
              {teammates.map((teammate, index) => (
                <Box key={`${teammate.email}-${index}`}>
                  <Divider />
                  <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', py: 1.25 }}>
                    <Avatar color="primary" size="xs">
                      {teammate.initials}
                    </Avatar>
                    <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                      {teammate.email}
                    </Typography>
                    <Chip label="Pending" color="warning" variant="light" size="small" sx={{ ml: 'auto' }} />
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </MainCard>
      )}

      {step === 'alone' && (
        <MainCard>
          <Stack sx={{ gap: 0.5, mb: 3 }}>
            <Typography variant="h5">You&apos;re all set</Typography>
            <Typography variant="body2" color="text.secondary">
              Continuing alone — invite teammates anytime from Settings
            </Typography>
          </Stack>
          <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, p: 2, mb: 3 }}>
            <Stack sx={{ gap: 1 }}>
              {[
                ['Project', projectName],
                ['Owner', 'You'],
                ['Members', '1']
              ].map(([label, value]) => (
                <Stack key={label} direction="row" sx={{ justifyContent: 'space-between', gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ textAlign: 'right', wordBreak: 'break-word' }}>
                    {value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
          <Stack direction="row" sx={{ gap: 1.5, '& > *': { flex: 1 } }}>
            <Button fullWidth size="large" variant="outlined" color="secondary" onClick={() => setStep('invite')}>
              Invite instead
            </Button>
            <AnimateButton>
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                onClick={() => setAloneStatus(`Opening "${projectName}"… (simulated, no real navigation)`)}
              >
                Go to project
              </Button>
            </AnimateButton>
          </Stack>
          {aloneStatus && (
            <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
              {aloneStatus}
            </Typography>
          )}
        </MainCard>
      )}
    </Box>
  );
}
