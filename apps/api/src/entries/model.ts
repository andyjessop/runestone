import { CreateEntry, Entry } from '@runestone/interfaces';

export function create(entry: CreateEntry): Entry {
  return {
    features: [],
    variables: [],
    ...entry,
  };
}

export function update(entry: Entry, newEntry: Partial<Entry>): Entry {
  return {
    ...entry,
    ...newEntry,
  };
}