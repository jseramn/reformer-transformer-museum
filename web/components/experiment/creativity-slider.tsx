"use client";

import { API_LIMITS } from "@/lib/constants";
import { useTranslations } from "@/lib/i18n/use-translations";

type CreativitySliderProps = {
  value: number;
  onChange: (temperature: number) => void;
  disabled?: boolean;
};

function temperatureToSliderValue(temperature: number): number {
  const { temperatureMin, temperatureMax } = API_LIMITS;
  return Math.round(
    ((temperature - temperatureMin) / (temperatureMax - temperatureMin)) * 100,
  );
}

function sliderValueToTemperature(sliderValue: number): number {
  const { temperatureMin, temperatureMax } = API_LIMITS;
  const ratio = sliderValue / 100;
  const temperature = temperatureMin + ratio * (temperatureMax - temperatureMin);
  return Math.round(temperature * 10) / 10;
}

export function CreativitySlider({
  value,
  onChange,
  disabled = false,
}: CreativitySliderProps) {
  const t = useTranslations();
  const sliderValue = temperatureToSliderValue(value);

  return (
    <div className="flex flex-col gap-sm">
      <label
        htmlFor="creativity-slider"
        className="text-body-sm font-normal text-body"
      >
        {t.experiment.creativityLabel}
      </label>

      <input
        id="creativity-slider"
        type="range"
        min={0}
        max={100}
        step={1}
        value={sliderValue}
        disabled={disabled}
        onChange={(event) => {
          onChange(sliderValueToTemperature(Number(event.target.value)));
        }}
        className="h-2 w-full cursor-pointer appearance-none rounded-pill bg-canvas-mid accent-accent-sunset disabled:cursor-not-allowed disabled:opacity-50"
        aria-valuemin={API_LIMITS.temperatureMin}
        aria-valuemax={API_LIMITS.temperatureMax}
        aria-valuenow={value}
        aria-valuetext={`${value}`}
      />

      <div className="flex items-center justify-between text-body-sm text-body-mid">
        <span>{t.experiment.creativityFaithful}</span>
        <span>{t.experiment.creativityImaginative}</span>
      </div>
    </div>
  );
}