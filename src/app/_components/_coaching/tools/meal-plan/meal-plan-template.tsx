import { Page, View, Document, Text, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import { showDecimalIfNotZero } from "~/app/_lib/utils";
import { MealPlanMeal } from "~/app/_state/coaching/tools/meal-plan/coachingMealPlanState";

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  metaDataWrapper: {
    position: "absolute",
    top: 12,
    left: 12,
  },

  metaDataText: {
    fontFamily: "Helvetica",
    fontSize: 10,
  },

  documentContentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },

  mealsContentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },

  bold: {
    fontFamily: "Helvetica-Bold",
  },
  header: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
  },
  mealSummaryHeader: {
    borderTop: "1px solid #E5E7EB",
    backgroundColor: "#F1F5F9",
    paddingVertical: 8,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  mealName: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
  },
  macroName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  macroAmount: {
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  mealTotalWrapper: {
    display: "flex",
  },
  mealFoodsHeaderWrapper: {
    borderBottom: "1px solid #E5E7EB",
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mealFoodsHeader: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
  },
  foodNameSize: {
    width: "25%",
  },
  macroSize: {
    width: "15%",
  },
  mealFoodsRowWrapper: {
    borderBottom: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  mealFoodRowData: {
    fontFamily: "Helvetica",
    fontSize: 10,
  },

  descriptionWrapper: {
    paddingTop: 8,
  },

  description: {
    fontSize: 10,
    paddingHorizontal: 12,
  },

  totalsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },

  totalMacroWrapper: {
    fontSize: 12,
  },

  totalsWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottom: "1px solid #E5E7EB",
    borderTop: "1px solid #E5E7EB",
  },

  totalHeader: {
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
  },
});

const MealPlanTemplate: React.FC<{
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalKcal: number;
  meals: MealPlanMeal[];
  clientName?: string;
  coachName?: string;
  startDate?: string;
  endDate?: string;
}> = ({
  totalCarbs,
  totalFat,
  totalKcal,
  totalProtein,
  meals,
  clientName,
  coachName,
  endDate,
  startDate,
}) => {
  const calculatePaddingTop = () => {
    let paddingTop = 0;

    let basePadding = 36;

    if (coachName) {
      basePadding -= 7;
      paddingTop += basePadding;
    }
    if (clientName) {
      basePadding -= 7;
      paddingTop += basePadding;
    }
    if (startDate) {
      basePadding -= 7;
      paddingTop += basePadding;
    }
    if (endDate) {
      basePadding -= 7;
      paddingTop += basePadding;
    }

    return paddingTop === 0 ? 36 : paddingTop;
  };

  return (
    <Document>
      <Page
        size={"A4"}
        style={[
          styles.body,
          {
            paddingTop: calculatePaddingTop(),
          },
        ]}
      >
        <View style={styles.metaDataWrapper} fixed>
          {coachName && (
            <Text style={styles.metaDataText}>
              <Text style={styles.bold}>Coach:</Text> {coachName}
            </Text>
          )}

          {clientName && (
            <Text style={styles.metaDataText}>
              <Text style={styles.bold}>Till:</Text> {clientName}
            </Text>
          )}

          {startDate && (
            <Text style={styles.metaDataText}>
              <Text style={styles.bold}>Startdatum:</Text> {startDate}
            </Text>
          )}
          {endDate && (
            <Text style={styles.metaDataText}>
              <Text style={styles.bold}>Slutdatum:</Text> {endDate}
            </Text>
          )}
        </View>

        <View style={styles.documentContentWrapper}>
          <Text style={styles.header}>Kostschema</Text>

          <View style={styles.mealsContentContainer} wrap={false}>
            {meals.length > 0 &&
              meals.map((meal) => (
                <View key={meal.id}>
                  {/* SUMMARY OF MEAL */}

                  <View style={[styles.mealSummaryHeader]}>
                    <Text style={[styles.mealName, styles.foodNameSize]}>
                      {meal.name}
                    </Text>

                    <Text style={[styles.macroSize, styles.macroName]}></Text>

                    <View style={[styles.mealTotalWrapper, styles.macroSize]}>
                      <Text style={styles.macroName}>Kalorier</Text>
                      <Text style={styles.macroAmount}>
                        {showDecimalIfNotZero(
                          meal.foods.reduce(
                            (acc, food) => (acc += food.calculatedKcal),
                            0,
                          ),
                        )}
                      </Text>
                    </View>

                    <View style={[styles.mealTotalWrapper, styles.macroSize]}>
                      <Text style={styles.macroName}>Protein</Text>
                      <Text style={styles.macroAmount}>
                        {showDecimalIfNotZero(
                          meal.foods.reduce(
                            (acc, food) => (acc += food.calculatedProtein),
                            0,
                          ),
                        )}{" "}
                        g
                      </Text>
                    </View>

                    <View style={[styles.mealTotalWrapper, styles.macroSize]}>
                      <Text style={styles.macroName}>Fett</Text>
                      <Text style={styles.macroAmount}>
                        {showDecimalIfNotZero(
                          meal.foods.reduce(
                            (acc, food) => (acc += food.calculatedFat),
                            0,
                          ),
                        )}{" "}
                        g
                      </Text>
                    </View>

                    <View style={[styles.mealTotalWrapper, styles.macroSize]}>
                      <Text style={styles.macroName}>Kolhydrater</Text>
                      <Text style={styles.macroAmount}>
                        {showDecimalIfNotZero(
                          meal.foods.reduce(
                            (acc, food) => (acc += food.calculatedCarbs),
                            0,
                          ),
                        )}{" "}
                        g
                      </Text>
                    </View>
                  </View>

                  {/* MEAL HEADER */}

                  <View style={styles.mealFoodsHeaderWrapper}>
                    <Text style={[styles.mealFoodsHeader, styles.foodNameSize]}>
                      NAMN
                    </Text>
                    <Text style={[styles.mealFoodsHeader, styles.macroSize]}>
                      MÄNGD
                    </Text>
                    <Text style={[styles.mealFoodsHeader, styles.macroSize]}>
                      KALORIER
                    </Text>
                    <Text style={[styles.mealFoodsHeader, styles.macroSize]}>
                      PROTEIN
                    </Text>
                    <Text style={[styles.mealFoodsHeader, styles.macroSize]}>
                      FETT
                    </Text>
                    <Text style={[styles.mealFoodsHeader, styles.macroSize]}>
                      KOLHYDRATER
                    </Text>
                  </View>

                  {/* MEAL FOODS */}

                  {meal.foods.length > 0 &&
                    meal.foods.map((food) => (
                      <View style={styles.mealFoodsRowWrapper} key={food.id}>
                        <Text
                          style={[styles.mealFoodRowData, styles.foodNameSize]}
                        >
                          {food.name}
                        </Text>

                        <Text
                          style={[styles.mealFoodRowData, styles.macroSize]}
                        >
                          {showDecimalIfNotZero(food.amount)}{" "}
                          {food.unit !== "unit" ? food.unit : "st"}
                        </Text>
                        <Text
                          style={[styles.mealFoodRowData, styles.macroSize]}
                        >
                          {showDecimalIfNotZero(food.calculatedKcal)} g
                        </Text>
                        <Text
                          style={[styles.mealFoodRowData, styles.macroSize]}
                        >
                          {showDecimalIfNotZero(food.calculatedProtein)} g
                        </Text>
                        <Text
                          style={[styles.mealFoodRowData, styles.macroSize]}
                        >
                          {showDecimalIfNotZero(food.calculatedFat)} g
                        </Text>
                        <Text
                          style={[styles.mealFoodRowData, styles.macroSize]}
                        >
                          {showDecimalIfNotZero(food.calculatedCarbs)} g
                        </Text>
                      </View>
                    ))}

                  {meal.description && (
                    <View style={styles.descriptionWrapper}>
                      <Text style={[styles.description, styles.bold]}>
                        Beskrining
                      </Text>
                      <Text style={styles.description}>{meal.description}</Text>
                    </View>
                  )}
                </View>
              ))}
          </View>

          <View wrap={false} style={styles.totalsContainer}>
            <View style={styles.totalsWrapper}>
              <View style={[styles.macroSize, styles.foodNameSize]}>
                <Text style={[styles.totalHeader]}>Totalt:</Text>
              </View>

              <Text style={[styles.macroSize]}></Text>

              <View style={[styles.totalMacroWrapper, styles.macroSize]}>
                <Text style={styles.bold}>Kalorier</Text>
                <Text>{showDecimalIfNotZero(totalKcal, 0)}</Text>
              </View>

              <View style={[styles.totalMacroWrapper, styles.macroSize]}>
                <Text style={[styles.bold]}>Protein</Text>
                <Text>{showDecimalIfNotZero(totalProtein, 0)} g</Text>
              </View>

              <View style={[styles.totalMacroWrapper, styles.macroSize]}>
                <Text style={styles.bold}>Fett</Text>
                <Text>{showDecimalIfNotZero(totalFat, 0)} g</Text>
              </View>

              <View style={[styles.totalMacroWrapper, styles.macroSize]}>
                <Text style={styles.bold}>Kolhydrater</Text>
                <Text>{showDecimalIfNotZero(totalCarbs, 0)} g</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MealPlanTemplate;
