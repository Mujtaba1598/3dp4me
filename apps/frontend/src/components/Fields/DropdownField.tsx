import { NativeSelect } from '@mui/material'

import { useTranslations } from '../../hooks/useTranslations'
import { DropdownInput } from '../DropdownInput/DropdownInput'
import { FormOption } from './FormOption'

export interface DropdownFieldProps<T extends string> {
    fieldId: T
    title: string
    value?: string
    options: FormOption[]
    isDisabled?: boolean
    onChange?: (field: T, value: string) => void
}

const DropdownField = <T extends string>({
    fieldId,
    title,
    value = '',
    options,
    isDisabled = false,
    onChange,
}: DropdownFieldProps<T>) => {
    const [translations, selectedLang] = useTranslations()

    const shouldHideOption = (option: FormOption) =>
        option.IsHidden && value?.toString() !== option._id.toString()

    const optionsFields = options.map((option) => {
        if (shouldHideOption(option)) return null

        return (
            <option
                value={option._id}
                disabled={isDisabled}
                key={option._id}
            >
                {option.Question[selectedLang]}
            </option>
        )
    })

    if (value === '') {
        optionsFields.unshift(
            <option value="" key="empty">
                {translations.components.swal.field.selectOption}
            </option>
        )
    }

    return (
        <div>
            <h3>{title}</h3>
            <NativeSelect
                onChange={(e) => onChange?.(fieldId, e.target.value)}
                value={value}
                input={<DropdownInput />}
            >
                {optionsFields}
            </NativeSelect>
        </div>
    )
}

export default DropdownField
