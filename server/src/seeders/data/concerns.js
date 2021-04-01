module.exports.default = [
  {
    id: 1,
    code: 'GENPHYS',
    label: 'General Environmental Health: Physical/Chemical Water Quality',
    description:
      'Routine water quality sampling that quantifies basic physical and/or chemical characteristics of the water.',
    concernSort: 1,
  },
  {
    id: 2,
    code: 'EUTRO',
    label: 'Eutrophication (Nutrients)',
    description:
      'Sampling that focuses on algal growth and/or blooms, including causes (i.e., nutrients) and effects (i.e., algal toxins).',
    concernSort: 4,
  },
  {
    id: 3,
    code: 'ILLCONN',
    label: 'Illicit Connections',
    description:
      'Sampling that investigates or monitors the potential or confirmed existence of unapproved and/or hazardous discharges to waterways.',
    concernSort: 6,
  },
  {
    id: 4,
    code: 'GENBENTHIC',
    label: 'General Environmental Health: Benthic',
    description: 'Sampling that focuses on properties of the sediment and/or the organisms that live in or on it.',
    concernSort: 2,
  },
  {
    id: 5,
    code: 'ALGAL',
    label: 'Harmful Algal Blooms (HABs) (Algal Toxins)',
    description:
      'Sampling that focuses on algal growth and/or blooms, including causes (i.e., nutrients) and effects (i.e., algal toxins).',
    concernSort: 5,
  },
  {
    id: 6,
    code: 'STORMWTR',
    label: 'Stormwater',
    description:
      'Sampling focused on a stormwater discharge point or assessing a watershed for the effects of stormwater runoff, especially from impervious surfaces.',
    concernSort: 8,
  },
  {
    id: 7,
    code: 'REC',
    label: 'Recreation (Swimming and/or Boating)',
    description: 'Sampling that monitors recreation areas for parameters that could threaten human health.',
    concernSort: 7,
  },
  {
    id: 8,
    code: 'OTH',
    label: 'Other',
    description:
      'Any water quality concern not captured in the above descriptions. Note that the user must insert text to the generated QAPP describing this concern. Furthermore, the generated QAPP will not be eligible for expedited review by MADEP if “Other” is selected.',
    concernSort: 9,
  },
  {
    id: 9,
    code: 'ACID',
    label: 'Acidification',
    description: '',
    concernSort: 3,
  },
];
