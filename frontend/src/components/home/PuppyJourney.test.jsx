import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PuppyJourney from './PuppyJourney';

const sourceSteps = [
  { number: '01', title: 'Choose your breed', description: 'Choose a preferred breed.' },
  { number: '02', title: 'Get photos & details', description: 'We share photos and details.' },
  { number: '03', title: 'Secure & safe delivery', description: 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.' },
];

describe('PuppyJourney', () => {
  it('splits the existing final description into four milestones without adding a new process', () => {
    render(<BrowserRouter><PuppyJourney steps={sourceSteps} /></BrowserRouter>);
    expect(screen.getByRole('heading', { name: 'Choose your breed' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Get photos & details' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Secure your puppy' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Safe delivery' })).toBeInTheDocument();
    expect(screen.getByText('Once confirmed, we handle everything professionally.')).toBeInTheDocument();
    expect(screen.getByText('We ensure your puppy reaches you safely and stress-free.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /How it works/i })).toHaveAttribute('href', '/how-it-works');
  });
});
