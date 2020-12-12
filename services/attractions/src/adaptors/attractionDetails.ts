import * as E from 'fp-ts/lib/Either';

import { AttractionDetail } from '../models/AttractionDetail';
import { AttractionDetailRaw } from '../models/AttractionDetailRaw';

export interface AttractionDetailsAdaptor {
  fromTouringPlans: (raw: AttractionDetailRaw) => E.Either<Error, AttractionDetail>;
}

export const adaptor = () => (): AttractionDetailsAdaptor => ({
  fromTouringPlans: (raw) => E.tryCatch(
    () => ({
      assistiveListening: raw.assistive_listening,
      audioDescription: raw.audio_description,
      categoryCode: raw.category_code,
      climateControlled: raw.climate_controlled,
      crazyThreshold: raw.crazy_threshold,
      duration: raw.duration,
      fastpassBooth: raw.fastpass_booth,
      fastpassOnly: raw.fastpass_only,
      frightening: raw.frightening,
      handheldCaptioning: raw.handheld_captioning,
      heightRestriction: raw.height_restriction,
      latitude: raw.latitude,
      longitude: raw.longitude,
      matchName: raw.match_name,
      name: raw.name,
      noServiceAnimals: raw.no_service_animals,
      notToBeMissed: raw.not_to_be_missed,
      openEmhEvening: raw.open_emh_evening,
      openEmhMorning: raw.open_emh_morning,
      openNotSoScary: raw.open_not_so_scary,
      openVeryMerry: raw.open_very_merry,
      openedOn: raw.opened_on,
      operationalNotes: raw.operational_notes,
      operatorType: raw.operator_type,
      riderSwap: raw.rider_swap,
      seasonal: raw.seasonal,
      signLanguage: raw.sign_language,
      singleRider: raw.single_rider,
      whatItIs: raw.what_it_is,
      whenToGo: raw.when_to_go,
    }),
    (e) => e as Error,
  ),
});

export const attractionDetailsAdaptor = adaptor();
