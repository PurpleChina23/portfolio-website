import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import StorefrontIcon from '@mui/icons-material/Storefront';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Typography from '@mui/material/Typography';
import './RoadMapTimeline.css';

export default function RoadMapTimeline() {
  return (
    <Timeline position="alternate" className="roadmap-timeline">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          className="timeline-date-text"
        >
          2020 – 2024
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector className="timeline-connector" />
          <TimelineDot className="timeline-dot">
            <SchoolIcon />
          </TimelineDot>
          <TimelineConnector className="timeline-connector" />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" className="timeline-title">
            Honours BSc in Mathematics & Computer Science
          </Typography>
          <Typography className="timeline-description">
            University of Toronto – Built foundation in ML, deep learning, computer vision, and data analysis.
          </Typography>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          className="timeline-date-text"
        >
          2022 – Present
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector className="timeline-connector" />
          <TimelineDot className="timeline-dot timeline-dot-primary">
            <StorefrontIcon />
          </TimelineDot>
          <TimelineConnector className="timeline-connector" />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" className="timeline-title">
            Independent Data Analyst & Developer
          </Typography>
          <Typography className="timeline-description">
            Trading Card Business – Built automated card grading system and inventory & sales tracking pipeline, boosting efficiency and profit margins.
          </Typography>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          className="timeline-date-text"
        >
          2025
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector className="timeline-connector" />
          <TimelineDot className="timeline-dot timeline-dot-secondary">
            <WorkIcon />
          </TimelineDot>
          <TimelineConnector className="timeline-connector" />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" className="timeline-title">
            AI-Powered Sales Advisor
          </Typography>
          <Typography className="timeline-description">
            Golf Town – Developed RAG chatbot and integrated data-driven insights to improve equipment recommendations and customer satisfaction.
          </Typography>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          className="timeline-date-text"
        >
          2025 – 2026
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector className="timeline-connector" />
          <TimelineDot className="timeline-dot timeline-dot-accent">
            <SchoolIcon />
          </TimelineDot>
          <TimelineConnector className="timeline-connector" />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" className="timeline-title">
            Master of Data Analytics (AI)
          </Typography>
          <Typography className="timeline-description">
            Western University (Expected 08/2026) – Applying expertise in software engineering, ML, and AI solutions while exploring opportunities to combine technical skills with creativity.
          </Typography>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          className="timeline-date-text"
        >
          2026 and Beyond
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector className="timeline-connector" />
          <TimelineDot className="timeline-dot timeline-dot-future">
            <EmojiEventsIcon />
          </TimelineDot>
          <TimelineConnector className="timeline-connector-fade" />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span" className="timeline-title">
            Future Vision
          </Typography>
          <Typography className="timeline-description">
            Join innovative teams building cutting-edge AI and data-driven solutions. Apply experience to solve meaningful, high-impact problems while continuing to learn and contribute to projects that bridge theory with real-world practice.
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
