# Google Forms RSVP System Setup Guide

This guide explains how to set up and manage the Google Forms RSVP system for CASB events.

## Overview

The RSVP system integrates Google Forms with your website to provide a seamless event registration experience. Users can RSVP for events directly from your website, which then redirects them to a Google Form to complete their registration.

## Setup Instructions

### 1. Create Google Forms for Each Event

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form for each event
3. Add relevant fields such as:
   - Name
   - Email
   - Phone number (optional)
   - Dietary restrictions (for food events)
   - Questions specific to the event
4. Set the form to collect email addresses
5. Configure response destination (Google Sheets recommended for easy tracking)

### 2. Get the Form URL

1. Click the "Send" button in your Google Form
2. Copy the form URL (it will look like: `https://forms.gle/xxxxxxxxxx`)
3. Test the form to ensure it works correctly

### 3. Update Event Configuration

Edit the file `lib/events-config.ts` and update the `formUrl` field for each event:

```typescript
{
  id: "your-event-id",
  title: "Your Event Title",
  description: "Event description",
  formUrl: "https://forms.gle/your-actual-form-id", // Replace this
  isActive: true,
  startDate: "2025-01-15",
  maxCapacity: 50,
  currentRSVPs: 0
}
```

### 4. Manage RSVP Counts

To update the current RSVP count for an event:

1. Check your Google Form responses
2. Update the `currentRSVPs` field in `lib/events-config.ts`
3. Or use the helper function:

```typescript
import { updateRSVPCount } from '../lib/events-config';

updateRSVPCount('event-id', newCount);
```

## Event Configuration Options

Each event can have the following properties:

- `id`: Unique identifier for the event
- `title`: Event title displayed to users
- `description`: Event description
- `formUrl`: Google Form URL for RSVP
- `isActive`: Whether registration is currently open
- `startDate`: Event date (YYYY-MM-DD format)
- `endDate`: End date for multi-day events (optional)
- `maxCapacity`: Maximum number of attendees
- `currentRSVPs`: Current number of RSVPs

## Adding New Events

1. Create a Google Form for the new event
2. Add the event configuration to `lib/events-config.ts`:

```typescript
{
  id: "new-event-id",
  title: "New Event Title",
  description: "Event description",
  formUrl: "https://forms.gle/your-form-id",
  isActive: true,
  startDate: "2025-01-20",
  maxCapacity: 30,
  currentRSVPs: 0
}
```

3. The event will automatically appear in the RSVP system

## Best Practices

### Form Design
- Keep forms concise and relevant
- Use clear, simple language
- Include required fields only
- Add helpful instructions where needed

### Capacity Management
- Set realistic capacity limits
- Monitor RSVP counts regularly
- Update capacity status in the configuration
- Consider waitlist options for popular events

### Response Tracking
- Use Google Sheets to track responses
- Set up email notifications for new responses
- Regularly export data for backup
- Consider using Google Apps Script for automation

## Troubleshooting

### Form Not Loading
- Check if the form URL is correct
- Ensure the form is published and accessible
- Test the form URL in an incognito window

### RSVP Count Not Updating
- Verify the `currentRSVPs` field is updated in the configuration
- Check that the event ID matches exactly
- Ensure the component is re-rendering after updates

### Form Responses Not Received
- Check form settings and permissions
- Verify email collection is enabled
- Test form submission process

## Advanced Features

### Custom Form Fields
You can customize the Google Form to include:
- File uploads (for documents, photos)
- Multiple choice questions
- Rating scales
- Conditional logic

### Integration with Google Calendar
- Add form responses to Google Calendar events
- Send confirmation emails with calendar invites
- Track attendance automatically

### Analytics and Reporting
- Use Google Forms' built-in analytics
- Export data to Google Sheets for analysis
- Create custom dashboards for event tracking

## Security Considerations

- Never share form URLs publicly if they contain sensitive information
- Use form validation to prevent spam submissions
- Regularly review and clean up old form responses
- Consider using Google Workspace for better security features

## Support

For technical support or questions about the RSVP system, contact the CASB development team or refer to the Google Forms documentation. 