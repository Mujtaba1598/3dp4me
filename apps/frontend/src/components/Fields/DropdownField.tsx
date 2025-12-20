import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

import { useTranslations } from '../../hooks/useTranslations'
import { FormOption } from './FormOption'
import { NativeSelect } from '@mui/material'
import { DropdownInput } from '../DropdownInput/DropdownInput'
import { getFieldName } from '../../utils/fields'

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
    const selectedLang = useTranslations()[1]

    const shouldHideOption = (option: FormOption) =>
        option.IsHidden && value?.toString() !== option._id.toString()

    const generateOptions = () =>
        options.map((option) => {
            if (shouldHideOption(option)) return null

            return (
                <option value={option._id} className="create-field-option" disabled={isDisabled} key={option._id} >
                    {option.Question[selectedLang]}
                </option>
            )
        })

    return (
        <div>
            <h3>{title}</h3>
            <NativeSelect
                id="create-field-type-dropdown"
                onChange={(e) => onChange?.(fieldId, e.target.value)}
                value={value}
                input={<DropdownInput />}
            >
                {generateOptions()}
            </NativeSelect>
        </div>
    )
}

export default DropdownField
