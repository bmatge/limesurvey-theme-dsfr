# ERROR ANALYSIS: "end(): Argument #1 ($array) must be of type array, null given"

## Executive Summary

The LimeSurvey DSFR theme contains **5 critical files** with unsafe array access patterns that can cause the PHP `end()` function error when `aSurveyInfo.aQuestionIndex` is null.

---

## Problem 1: progress_bar.twig

**File**: `/home/user/limesurvey-theme-dsfr/views/subviews/header/progress_bar.twig`  
**Severity**: HIGH

### Problematic Code

**Lines 7-11:**
```twig
{% if aSurveyInfo.showprogress == 'Y' and aSurveyInfo.format != 'A' and not aSurveyInfo.aCompleted and aSurveyInfo.aQuestionIndex.items %}
    <!-- DSFR Stepper -->
    <div class="fr-container fr-my-4w">
        {# Utiliser les données de l'index des questions #}
        {% set totalSteps = aSurveyInfo.aQuestionIndex.items ? aSurveyInfo.aQuestionIndex.items|length : 1 %}
```

### Issues

1. **Line 7**: Checks `aSurveyInfo.aQuestionIndex.items` directly without verifying `aQuestionIndex` exists
2. **Line 11**: Ternary operator accesses `.items` twice, which fails if `aQuestionIndex` is null

### Why It Fails

When `aSurveyInfo.aQuestionIndex` is null:
- `aSurveyInfo.aQuestionIndex.items` → tries to access property of null
- LimeSurvey's PHP code internally may call `end()` on the null value
- PHP 8.0+ strict typing: `end(null)` throws error

### Fix Required

```twig
{% if aSurveyInfo.showprogress == 'Y' and aSurveyInfo.format != 'A' and not aSurveyInfo.aCompleted and aSurveyInfo.aQuestionIndex and aSurveyInfo.aQuestionIndex.items %}
    <!-- DSFR Stepper -->
    <div class="fr-container fr-my-4w">
        {# Utiliser les données de l'index des questions #}
        {% set totalSteps = aSurveyInfo.aQuestionIndex.items|length %}
```

**Changes**:
- Add `aSurveyInfo.aQuestionIndex` null check
- Remove ternary operator (condition guarantees items exists)

---

## Problem 2: question_index_groups_buttons.twig

**File**: `/home/user/limesurvey-theme-dsfr/views/subviews/navigation/question_index_groups_buttons.twig`  
**Severity**: CRITICAL

### Problematic Code

**Lines 1-10:**
```twig
{#
    This file is part of LimeSurvey
    Copyright (C) 2018 The LimeSurvey Project Team
    This file render group index
#}
<div class="list-group index-button-full">
  <div class="list-group-item">
      <div class="h4 list-group-item-heading">{{ gT("Question index") }}</div>
  </div>
  {% for step, indexItem in aSurveyInfo.aQuestionIndex.items %}
```

### Issues

1. **NO CONDITIONAL CHECK** before iteration
2. Directly iterates over `aQuestionIndex.items` which can be null
3. Will be included by `navigator_complement.twig` without additional validation

### Why It Fails

- This file is included by `navigator_complement.twig` which only checks `bShow`
- No verification that `aQuestionIndex` or `items` exists
- Direct loop causes LimeSurvey to call `end()` on null

### Fix Required

```twig
{#
    This file is part of LimeSurvey
    Copyright (C) 2018 The LimeSurvey Project Team
    This file render group index
#}
{% if aSurveyInfo.aQuestionIndex and aSurveyInfo.aQuestionIndex.items %}
<div class="list-group index-button-full">
  <div class="list-group-item">
      <div class="h4 list-group-item-heading">{{ gT("Question index") }}</div>
  </div>
  {% for step, indexItem in aSurveyInfo.aQuestionIndex.items %}
    ...
  {% endfor %}
</div>
{% endif %}
```

**Changes**:
- Wrap entire content in null check
- Verify both `aQuestionIndex` and `items` exist

---

## Problem 3: question_index_questions_buttons.twig

**File**: `/home/user/limesurvey-theme-dsfr/views/subviews/navigation/question_index_questions_buttons.twig`  
**Severity**: CRITICAL

### Problematic Code

**Lines 1-10:**
```twig
{#
    This file is part of LimeSurvey
    Copyright (C) 2018 The LimeSurvey Project Team
    This file render question index
#}
<div class="list-group index-button index-button-{{ aSurveyInfo.aQuestionIndex.type }}">
    <div class="list-group-item">
        <div class="h4 list-group-item-heading">{{ gT("Question index") }}</div>
    </div>
    {% for indexGroup in aSurveyInfo.aQuestionIndex.items %}
```

### Issues

1. **NO CONDITIONAL CHECK** - identical to problem 2
2. Accesses `aQuestionIndex.type` on line 6 without null check
3. Accesses `aQuestionIndex.items` on line 10 without null check

### Why It Fails

- Same as Problem 2
- Additionally accesses `.type` property which also fails if null

### Fix Required

```twig
{#
    This file is part of LimeSurvey
    Copyright (C) 2018 The LimeSurvey Project Team
    This file render question index
#}
{% if aSurveyInfo.aQuestionIndex and aSurveyInfo.aQuestionIndex.items %}
<div class="list-group index-button index-button-{{ aSurveyInfo.aQuestionIndex.type }}">
    <div class="list-group-item">
        <div class="h4 list-group-item-heading">{{ gT("Question index") }}</div>
    </div>
    {% for indexGroup in aSurveyInfo.aQuestionIndex.items %}
        ...
    {% endfor %}
</div>
{% endif %}
```

**Changes**:
- Wrap entire content in null check
- Verify both `aQuestionIndex` and `items` exist

---

## Problem 4: question_index_menu.twig

**File**: `/home/user/limesurvey-theme-dsfr/views/subviews/navigation/question_index_menu.twig`  
**Severity**: HIGH

### Problematic Code

**Lines 26-80:**
```twig
{# Question index in group by group mode #}

{% if (aSurveyInfo.aQuestionIndex.bShow == true) %}
    {% if aSurveyInfo.format == 'G' %}
        <!-- Question index, group, {{ aSurveyInfo.aQuestionIndex.type }} -->
        <li class="dropdown nav-item ls-no-js-hidden fr-px-2w index-menu-{{ aSurveyInfo.aQuestionIndex.type }}">
            ...
            <ul class="dropdown-menu dropdown-menu-end">
                {# TODO: move back this logic to SurveyRuntime, and provide a ready to use indexItem.statusClass #}
                {% for step, indexItem in aSurveyInfo.aQuestionIndex.items %}
                    ...
                {% endfor %}
            </ul>
        </li>
    {% endif %}

    {# Question index in question by question mode #}
    {% if aSurveyInfo.format == 'S' %}
        <!-- Question index, question by question, {{ aSurveyInfo.aQuestionIndex.type }} -->
        <li class="dropdown nav-item ls-no-js-hidden dropdown index-menu-{{ aSurveyInfo.aQuestionIndex.type }}">
            ...
            <ul class="dropdown-sub-menu dropdown-menu">
                {% for group in aSurveyInfo.aQuestionIndex.items %}
```

### Issues

1. **Line 28**: Checks `bShow` but not if `aQuestionIndex` is null
2. **Line 31**: Accesses `aQuestionIndex.type` without null check
3. **Line 39**: Loops over `items` without additional null check
4. **Line 30**: Same issues repeated
5. **Line 72**: Another loop over `items`

### Why It Fails

- `aQuestionIndex` object is checked via `bShow` property
- In PHP, accessing a property on null returns null (Twig handles this)
- But the loop iteration may cause LimeSurvey to call `end()` on null

### Fix Required

```twig
{# Question index in group by group mode #}

{% if aSurveyInfo.aQuestionIndex and aSurveyInfo.aQuestionIndex.bShow == true %}
    {% if aSurveyInfo.format == 'G' %}
        <!-- Question index, group, {{ aSurveyInfo.aQuestionIndex.type }} -->
        <li class="dropdown nav-item ls-no-js-hidden fr-px-2w index-menu-{{ aSurveyInfo.aQuestionIndex.type }}">
            ...
            <ul class="dropdown-menu dropdown-menu-end">
                {# TODO: move back this logic to SurveyRuntime, and provide a ready to use indexItem.statusClass #}
                {% if aSurveyInfo.aQuestionIndex.items %}
                    {% for step, indexItem in aSurveyInfo.aQuestionIndex.items %}
                        ...
                    {% endfor %}
                {% endif %}
            </ul>
        </li>
    {% endif %}

    {# Question index in question by question mode #}
    {% if aSurveyInfo.format == 'S' %}
        <!-- Question index, question by question, {{ aSurveyInfo.aQuestionIndex.type }} -->
        <li class="dropdown nav-item ls-no-js-hidden dropdown index-menu-{{ aSurveyInfo.aQuestionIndex.type }}">
            ...
            <ul class="dropdown-sub-menu dropdown-menu">
                {% if aSurveyInfo.aQuestionIndex.items %}
                    {% for group in aSurveyInfo.aQuestionIndex.items %}
```

**Changes**:
- Add `aSurveyInfo.aQuestionIndex` null check on line 28
- Add additional null checks before each loop

---

## Problem 5: question_index_modal_dsfr.twig

**File**: `/home/user/limesurvey-theme-dsfr/views/subviews/navigation/question_index_modal_dsfr.twig`  
**Severity**: HIGH

### Problematic Code

**Lines 1-25:**
```twig
{#
LimeSurvey - DSFR Theme
Question Index Modal avec Sommaire DSFR
#}

{% if (aSurveyInfo.aQuestionIndex.bShow == true) and (aSurveyInfo.format != 'A') %}
    <!-- DSFR Modal for Question Index -->
    <dialog id="question-index-modal" class="fr-modal" aria-labelledby="question-index-modal-title">
        <div class="fr-container fr-container--fluid fr-fr-container">
            <div class="fr-grid-row fr-grid-row--center">
                <div class="fr-col-12 fr-col-md-10 fr-col-lg-8">
                    <div class="fr-modal__body">
                        <div class="fr-modal__header">
                            <button class="fr-btn--close fr-btn" aria-controls="question-index-modal" title="{{ gT("Close") }}">
                                {{ gT("Close") }}
                            </button>
                        </div>
                        <div class="fr-modal__content">

                            <!-- Sommaire DSFR -->
                            <nav class="fr-summary" role="navigation" aria-labelledby="question-index-modal-title">
                                <h2 class="fr-summary__title" id="question-index-modal-title">{{ gT("Question index") }}</h2>

                                <ol class="fr-summary__list">
                                    {% for step, indexItem in aSurveyInfo.aQuestionIndex.items %}
```

### Issues

1. **Line 6**: Checks `bShow` but not if `aQuestionIndex` is null
2. **Line 25**: Loops over `items` without additional check

### Why It Fails

- Same as Problem 4
- Accessing `.bShow` on null object may work in Twig, but loop fails

### Fix Required

```twig
{#
LimeSurvey - DSFR Theme
Question Index Modal avec Sommaire DSFR
#}

{% if aSurveyInfo.aQuestionIndex and aSurveyInfo.aQuestionIndex.bShow == true and (aSurveyInfo.format != 'A') and aSurveyInfo.aQuestionIndex.items %}
    <!-- DSFR Modal for Question Index -->
    <dialog id="question-index-modal" class="fr-modal" aria-labelledby="question-index-modal-title">
        <div class="fr-container fr-container--fluid fr-fr-container">
            <div class="fr-grid-row fr-grid-row--center">
                <div class="fr-col-12 fr-col-md-10 fr-col-lg-8">
                    <div class="fr-modal__body">
                        <div class="fr-modal__header">
                            <button class="fr-btn--close fr-btn" aria-controls="question-index-modal" title="{{ gT("Close") }}">
                                {{ gT("Close") }}
                            </button>
                        </div>
                        <div class="fr-modal__content">

                            <!-- Sommaire DSFR -->
                            <nav class="fr-summary" role="navigation" aria-labelledby="question-index-modal-title">
                                <h2 class="fr-summary__title" id="question-index-modal-title">{{ gT("Question index") }}</h2>

                                <ol class="fr-summary__list">
                                    {% for step, indexItem in aSurveyInfo.aQuestionIndex.items %}
```

**Changes**:
- Add comprehensive null checks in the condition
- Verify `aQuestionIndex`, `bShow`, and `items` all exist

---

## Summary Table

| File | Line | Type | Severity | Issue | Fix |
|------|------|------|----------|-------|-----|
| progress_bar.twig | 7, 11 | Incomplete check | HIGH | Missing aQuestionIndex null check | Add null check |
| question_index_groups_buttons.twig | 10 | No check | CRITICAL | Direct loop without condition | Add if block |
| question_index_questions_buttons.twig | 6, 10 | No check | CRITICAL | Direct access + loop | Add if block |
| question_index_menu.twig | 28-80 | Incomplete check | HIGH | Missing aQuestionIndex check | Add aQuestionIndex null test |
| question_index_modal_dsfr.twig | 6, 25 | Incomplete check | HIGH | Missing aQuestionIndex check | Add comprehensive checks |

---

## Common Pattern for Fix

All these issues follow the same pattern. Replace:
```twig
{% if aSurveyInfo.aQuestionIndex.property %}
    {% for item in aSurveyInfo.aQuestionIndex.items %}
```

With:
```twig
{% if aSurveyInfo.aQuestionIndex and aSurveyInfo.aQuestionIndex.items %}
    {% for item in aSurveyInfo.aQuestionIndex.items %}
```

Or more safely:
```twig
{% if aSurveyInfo.aQuestionIndex and aSurveyInfo.aQuestionIndex.property and aSurveyInfo.aQuestionIndex.items %}
    {% for item in aSurveyInfo.aQuestionIndex.items %}
```

---

## Testing Scenarios

To verify these fixes work, test with:

1. **All-in-One survey** (format 'A') - should not show question index
2. **Group-by-Group survey** (format 'G') - should show group-based index
3. **Question-by-Question survey** (format 'S') - should show question-based index
4. **Survey with no question index enabled** - aQuestionIndex will be null
5. **Different browser types** - PHP 7.x vs 8.x has different null handling

