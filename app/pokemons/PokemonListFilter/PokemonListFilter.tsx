"use client";

import { FC, useEffect, useRef, useState } from "react";
import styles from "./PokemonListFilter.module.scss";
import { useForm } from "react-hook-form";
import {
  FilterFormProps,
  formatFilterParams,
  getPokemonAbilities,
  parseFilterParams,
} from "./pokemonListFilter.utils";
import { InputActionMeta } from "react-select";
import { usePathname, useSearchParams } from "next/navigation";
import Button from "@/app/_components/Button";
import Fieldset from "@/app/_components/Fieldset";
import MultiSelect from "@/app/_components/MultiSelect";
import Input from "@/app/_components/Input";
import { useRouter } from "next/navigation";
import { Option } from "@/app/lib/types";

interface PokemonListFilterProps {
  pokemonTypes: Option[];
  onFilter?: () => void;
  onClear?: () => void;
}

const PokemonListFilter: FC<PokemonListFilterProps> = ({ pokemonTypes }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { control, handleSubmit, reset } = useForm<FilterFormProps>({
    defaultValues: { name: "", types: [] },
  });

  const action: () => void = handleSubmit(async (data) => {
    const params = formatFilterParams(data);

    const queryParams = params.toString();

    replace(`${pathname}${!queryParams ? "" : "?" + queryParams}`);
  });

  useEffect(() => {
    const resetForm = async () => {
      const { abilitiesIds, typesIds, name } = parseFilterParams(searchParams);
      const abilities = abilitiesIds?.length
        ? await getPokemonAbilities({
            ids: abilitiesIds.map((id) => id.toString()),
          }).then((response) =>
            response.data.items.map(({ id, name }) => ({
              label: name,
              value: id,
            }))
          )
        : [];
      const types =
        pokemonTypes?.filter((type) => typesIds.includes(type.value)) ?? [];
      reset({
        name,
        types,
        abilities,
      });
    };
    resetForm();
  }, [pokemonTypes, reset, searchParams]);
  const timeoutRef = useRef<NodeJS.Timeout>();
  return (
    <form
      data-testid="list_filter"
      className={styles.container}
      action={action}
    >
      <Fieldset name="name" label="Pokemon Name">
        <Input control={control} name="name" />
      </Fieldset>
      <Fieldset name="types" label="Pokemon Types">
        <MultiSelect options={pokemonTypes} name="types" control={control} />
      </Fieldset>

      <Fieldset name="abilities" label="Pokemon Abilities">
        <MultiSelect
          loadOptions={async (inputValue) => {
            return new Promise((resolve) => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              timeoutRef.current = setTimeout(async () => {
                getPokemonAbilities({ name: inputValue })
                  .then(({ data }) => {
                    return data.items.map(({ id, name }) => ({
                      label: name,
                      value: id,
                    }));
                  })
                  .then(resolve);
              }, 1000);
            });
          }}
          name="abilities"
          control={control}
        />
      </Fieldset>
      <div className={styles.buttons}>
        <Button variant="primary">Search</Button>
        <Button
          variant="secondary"
          type="button"
          className={styles.button}
          onClick={() => {
            replace(pathname);
          }}
        >
          Clear
        </Button>
      </div>
    </form>
  );
};

export default PokemonListFilter;
