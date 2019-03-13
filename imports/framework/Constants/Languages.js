const Languages = {
  defaultValue: 'E',
  allowedValues: [
    'A', 'ABK', 'AU', 'AC', 'AD', 'AF', 'AGC', 'AGR', 'AKA', 'AL', 'ALT', 'AM', 'AI', 'AMZ', 'R', 'REA',
    'AE', 'IE', 'AV', 'AP', 'AJ', 'AY', 'BLN', 'AR', 'BM', 'AO', 'BH', 'BB', 'BAK', 'BQ', 'BS', 'BEA',
    'BEL', 'EN', 'BE', 'ET', 'BTS', 'IK', 'BI', 'LM', 'BLF', 'BO', 'BSN', 'BRI', 'BK', 'BL', 'BY', 'CB',
    'CRB', 'AN', 'CV', 'CC', 'CM', 'CHT', 'HE', 'CS', 'CN', 'CMC', 'CNT', 'CH', 'CHS', 'CG', 'TB', 'CHO',
    'CK', 'CHL', 'CO', 'CHJ', 'TE', 'CU', 'CW', 'NM', 'CCM', 'CCP', 'CMG', 'COR', 'OCS', 'CYS', 'WCS',
    'CTR', 'C', 'CCT', 'B', 'DG', 'D', 'DRG', 'DAR', 'DK', 'DGS', 'MD', 'DGR', 'DI', 'DO', 'DA', 'KAD',
    'O', 'DZ', 'ED', 'EF', 'EA', 'E', 'EDF', 'EZ', 'ST', 'EW', 'FR', 'FLM', 'FA', 'FN', 'FI', 'FO', 'FF',
    'F', 'FS', 'FD', 'FT', 'GA', 'GZ', 'GRF', 'GBA', 'GE', 'X', 'DGS', 'GY', 'GN', 'GO', 'G', 'GL', 'GJ',
    'GI', 'GRJ', 'GU', 'EG', 'UN', 'GR', 'CR', 'HK', 'HA', 'HW', 'HY', 'Q', 'HR', 'HV', 'HI', 'MO', 'HM',
    'HO', 'HST', 'HUV', 'HCH', 'HU', 'H', 'IA', 'IG', 'IBI', 'IC', 'ID', 'IF', 'AA', 'IB', 'IGE', 'IJ',
    'IL', 'IN', 'ING', 'IU', 'GC', 'IR', 'IH', 'IS', 'I', 'IT', 'IV', 'IXC', 'IXL', 'JCL', 'J', 'JA',
    'JL', 'KBR', 'KEA', 'KBY', 'AH', 'KL', 'KJ', 'KLK', 'KAM', 'KAI', 'KAN', 'KA', 'BAL', 'KYH', 'KEK',
    'AZ', 'GK', 'KE', 'KHK', 'OG', 'KS', 'NA', 'KKP', 'KB', 'KD', 'KIK', 'KG', 'KQ', 'KLW', 'KU', 'KIM',
    'KIN', 'YW', 'IP', 'KIP', 'KZ', 'GB', 'RU', 'KI', 'KSN', 'KIT', 'KV', 'KM', 'KMP', 'KT', 'KO', 'OS',
    'KP', 'KRI', 'RI', 'KUA', 'KUK', 'KMK', 'RD', 'RDC', 'RDA', 'KUR', 'KH', 'WG', 'KY', 'KW', 'LCN',
    'LAD', 'LAH', 'LAK', 'AB', 'LN', 'LA', 'LP', 'LR', 'LT', 'LL', 'LJ', 'LZ', 'LHK', 'LF', 'LI', 'LIN',
    'LIS', 'L', 'LOM', 'LE', 'OM', 'LVA', 'LC', 'LU', 'LG', 'LY', 'LB', 'LD', 'LO', 'LV', 'LX', 'MS',
    'MC', 'MAC', 'MDI', 'MU', 'OR', 'MG', 'ML', 'MY', 'MT', 'MZ', 'MI', 'MN', 'MA', 'MAA', 'OL', 'MW',
    'MR', 'MRB', 'RE', 'MAR', 'MQ', 'MH', 'MB', 'MSH', 'MTL', 'CE', 'MAY', 'MYG', 'MYO', 'MZH', 'MAZ',
    'MBK', 'DU', 'ME', 'MWI', 'UU', 'MIS', 'MX', 'MXG', 'LS', 'MOK', 'MON', 'KHA', 'ON', 'MM', 'MOR',
    'MTZ', 'MTU', 'OU', 'MOU', 'BU', 'NAG', 'NHC', 'NB', 'NNG', 'NR', 'NV', 'NDA', 'NBL', 'OD', 'NE',
    'NP', 'NW', 'NG', 'NGL', 'NGK', 'NI', 'NC', 'NN', 'N', 'NO', 'UE', 'NU', 'KK', 'YM', 'NK', 'NY', 'NZ',
    'OCL', 'OKP', 'OI', 'OA', 'OK', 'OSS', 'OT', 'OTM', 'OV', 'PAI', 'PU', 'PAM', 'PM', 'PN', 'PPG', 'PA',
    'PH', 'PT', 'PR', 'PIM', 'PTJ', 'POK', 'P', 'PP', 'PPO', 'T', 'TCR', 'PL', 'PJ', 'QU', 'QC', 'RPN',
    'RA', 'RWG', 'RCR', 'M', 'RH', 'RM', 'RMC', 'RN', 'RO', 'RV', 'RR', 'U', 'RT', 'LUC', 'SKL', 'PS',
    'SA', 'ZA', 'LH', 'SM', 'SG', 'SRM', 'GCS', 'SEN', 'SNG', 'SE', 'SB', 'ER', 'SER', 'SU', 'SC', 'SHA',
    'SL', 'CA', 'SHU', 'DM', 'SK', 'ND', 'SN', 'V', 'SV', 'SP', 'SO', 'SNK', 'S', 'SR', 'UK', 'SD', 'SW',
    'SWI', 'Z', 'XSW', 'TBN', 'TG', 'TH', 'AT', 'TJ', 'TL', 'TNK', 'TRH', 'TRS', 'TAT', 'TA', 'TEC', 'TU',
    'TP', 'TPN', 'TTP', 'SI', 'TT', 'TBT', 'CI', 'TI', 'TV', 'TLN', 'OB', 'TR', 'TOB', 'TJO', 'MP', 'OE',
    'TO', 'TOR', 'TSC', 'TOT', 'TQ', 'SH', 'TS', 'TN', 'TRN', 'TK', 'TM', 'VL', 'VI', 'TW', 'TZE', 'TZO',
    'TZU', 'UM', 'UG', 'K', 'UB', 'UD', 'UR', 'DR', 'UZ', 'VE', 'VZ', 'VT', 'WAM', 'WA', 'LW', 'WY', 'W',
    'WL', 'WO', 'XV', 'XO', 'AW', 'YK', 'YA', 'YP', 'YQ', 'YG', 'YR', 'ZN', 'ZR', 'ZQ', 'ZO', 'ZU', 'OTHER'
  ]
}

export default Languages
