import { SyntheticEvent } from 'react';
import { ReactSelectOption, GoogleMapsResponse } from '@typedefs/app';
import { Location } from '@typedefs/app';

export interface FieldValue<V> {
  getValue(): V;
}

export class TextFieldValue implements FieldValue<string> {
  constructor(private value: string) {}
  getValue(): string {
    return this.value;
  }
}

export class FileFieldValue implements FieldValue<File> {
  constructor(private value: File[]) {}
  getValue(): File {
    return this.value[0];
  }
}

export class InputFileFieldValue implements FieldValue<File> {
  private value: File | null;
  constructor(e: SyntheticEvent<HTMLInputElement>) {
    this.value = e.currentTarget.files[0];
  }
  getValue(): File {
    return this.value;
  }
}

export class SelectFieldValue {
  constructor(private value: ReactSelectOption<string>) {}
  getValue(): string {
    return this.value.value;
  }
}

export class LocationFieldValue implements FieldValue<Location> {
  constructor(private data: GoogleMapsResponse, private address: string) {}
  getValue(): Location {
    try {
      return {
        lat: this.data?.results[0]?.geometry?.location?.lat,
        lng: this.data?.results[0]?.geometry?.location?.lng,
        name: this.address,
        address: this.data?.results[0]?.formatted_address,
      };
    } catch (e) {
      return {
        lat: 1,
        lng: 1,
        name: this.address,
        address: this.address,
      };
    }
  }
}
